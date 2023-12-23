import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Spiner from '../../Shared/Spiner';
import ToysRow from './ToysRow';
import useTitle from '../../utilities/useTitle';

const Toys = () => {
    const [loading, setLoading] = useState(true);
    const allToys = useLoaderData();
    const [toys, setToys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    useTitle();
    
    useEffect(() => {
        setToys(allToys);
        setLoading(false);
    }, [allToys])

    // Fetch Categories from server
    useEffect(() => {

        fetch('https://lego-shop-5580f.web.app')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categoris:', error));
    }, []);

    const getCategoryNameById = (catId) => {
        const category = categories.find((cat) => cat._id === catId);
        return category ? category.title : '';
    }
    useEffect(() => {
         handleSearch();
      }, [searchQuery]);
    
    const handleInputChange = (e) => {
        const query= e.target.value;
        setSearchQuery(query);
      };
    
    const handleSearch = () => {
        if(searchQuery===''){
            setToys(allToys);
            return;
        }      
        const url = `https://lego-shop-jade.vercel.app/toys?search=${searchQuery}`;
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    if(!data.length) setWarning(true) 
                    else setWarning(false);
                    setToys(data);
                }
                else {
                    // logout and then navigate
                    navigate('/');
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto px-10">
            <h1 className="text-3xl font-bold mb-4">All Toys</h1>
            <Spiner loading={loading}></Spiner>
            {/* Search toys by their name */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Toy Name"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded"
                />
            </div>
            {warning && <div className="alert alert-warning shadow-lg my-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>No toys found</span>
                </div>
            </div>}
            <table className="w-full border-collapse my-8">
                <thead>
                    <tr>
                        <th className="border py-2">Seller Name</th>
                        <th className="border py-2">Toy Name</th>
                        <th className="border py-2">Category</th>
                        <th className="border py-2">Price</th>
                        <th className="border py-2">Available Quantity</th>
                        <th className="border py-2">View Details</th>
                    </tr>
                </thead>
                <tbody>
                {toys.map(toy => <ToysRow key={toy._id} toy={toy} myToy={false}></ToysRow>)}
                </tbody>
            </table>
        </div>
    );
};

export default Toys;