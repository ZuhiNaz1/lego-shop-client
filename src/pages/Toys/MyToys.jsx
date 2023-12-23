import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spiner from '../../Shared/Spiner';
import ToysRow from './ToysRow';
import { AuthContext } from '../../providers/AuthProviders';
import ToyModal from './ToyModal';
import useTitle from '../../utilities/useTitle';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { alertSuccess } from '../../utilities/alert';


const MyToys = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [toys, setToys] = useState([]);
    const [toy, setToy] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        price: 0,
        quantity: 0,
        description: ''
    });
    const [sortOrder, setSortOrder] = useState('asc');
    const toyId = useRef('');
    useTitle();

    useEffect(() => {
        const url = `https://lego-shop-jade.vercel.app/toys?user_id=${user?.uid}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setToys(data)
                setLoading(false);
            })
            .catch(error => console.error('Error fetching toys:', error));
    }, [user])


    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleSearch = () => {
        if (searchQuery === '') {
            setLoading(true);
            setToys(toys);
            setLoading(false);
            return;
        }
        const url = `https://lego-shop-jade.vercel.app/toys?search=${searchQuery}&user_id=${user?.uid}`;
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    if (!data.length) setWarning(true)
                    else setWarning(false);
                    setToys(data);
                }
                else {
                    // logout and then navigate
                    navigate('/');
                }
            })
    }
    const handleUpdate = toy => {
        const url = `https://lego-shop-jade.vercel.app/toys/${toy._id}`;
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setToy(data);
                    setFormValues({ ['price']: data.price, ['quantity']: data.quantity, ['description']:data.description });
                    setIsModalOpen(true);

                }
                else {
                    // logout and then navigate
                    navigate('/');
                }
            })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const toy_id = toyId.current.value;
        const user_id = user?.uid;
        setFormValues(prevValues => ({ ...prevValues, [name]: value, toy_id, user_id }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        const toy_id = toyId.current.value;
        const url = `https://lego-shop-jade.vercel.app/toys/${toy_id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then(response => response.json())
            .then(data => {
                // Handle success response
                console.log('Toy updated successfully:', data);
                alertSuccess(`This Lego item has been updated successfully!!!`) 
                // Reset form values
                // setFormValues({
                //     price: 0,
                //     quantity: 0,
                //     description: '',
                // });
                setIsModalOpen(false);
                setToys(data);
            })
            .catch(error => {
                // Handle error
                console.error('Error updating toy:', error);
            });
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleDelete = id => {
        const proceed = confirm('Are You sure you want to delete');
        if (proceed) {
            fetch(`https://lego-shop-jade.vercel.app/toys/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        // alert('deleted successful'); todo alert
                        alertSuccess(`This Lego item has been deleted successfully!!!`)
                        const remaining = toys.filter(toy => toy._id !== id);
                        setToys(remaining);
                    }
                })
        }
    }
    const handleSort = () => {

        const url = `https://lego-shop-jade.vercel.app/toys?user_id=${user?.uid}&sort=${sortOrder}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setToys(data)
                setLoading(false);
            })
            .catch(error => console.error('Error fetching toys:', error));

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    return (
        <div className="max-w-7xl mx-auto px-10">
            <h1 className="text-3xl font-bold mb-4">My Toys</h1>
            <Spiner loading={loading}></Spiner>
            {/* Search toys by their name */}

                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Search by Toy Name"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                    <button onClick={handleSort} className='flex gap-2 items-center'>  {sortOrder === 'asc' ? <FaSortAmountDownAlt></FaSortAmountDownAlt> : <FaSortAmountUpAlt></FaSortAmountUpAlt>} Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})</button>
                </div>
                {warning && <div className="alert alert-warning shadow-lg my-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>No toys found</span>
                    </div>
                </div>}

            {toys.length ? <table className="w-full border-collapse my-8">
                <thead>
                    <tr>
                        <th className="border py-2">Seller Name</th>
                        <th className="border py-2">Toy Name</th>
                        <th className="border py-2">Category</th>
                        <th className="border py-2">Price</th>
                        <th className="border py-2">Available Quantity</th>
                        <th className="border py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {toys.map(toy => <ToysRow key={toy._id} toy={toy} myToy={true} handleUpdate={handleUpdate} handleDelete={handleDelete}></ToysRow>)}
                </tbody>
            </table> :
                <div className="alert alert-error shadow-lg my-24">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>No Toys have been added yet!!</span>
                    </div>
                </div>
            }

            {isModalOpen && (
                <ToyModal toy={toy} toyId={toyId} handleSubmit={handleSubmit} handleClose={handleClose} handleChange={handleChange}></ToyModal>
            )}
        </div>
    );
};

export default MyToys;