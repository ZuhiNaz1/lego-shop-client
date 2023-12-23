import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../utilities/useTitle';
import { alertSuccess } from '../../utilities/alert';

const Create = () => {
    useTitle()
    const { user }= useContext(AuthContext);
    const uid = useRef(''); 
    const categories = useLoaderData();
    const [formValues, setFormValues] = useState({
        pictureUrl: '',
        name: '',
        sellerName: user?.displayName,
        sellerEmail: user?.email,
        category: '',
        price: 0,
        rating: 0,
        quantity: 0,
        description: ''
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const user_id = uid.current.value;
        setFormValues(prevValues => ({ ...prevValues, [name]: value,user_id }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        fetch('https://lego-shop-5580f.web.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then(response => response.json())
            .then(data => {
                // Handle success response
                console.log('Toy added successfully:', data);
                alertSuccess(`This Lego item has been added successfully!!!` ) 
                // Reset form values
                setFormValues({
                    pictureUrl: '',
                    name: '',
                    sellerName: '',
                    sellerEmail: '',
                    category: '',
                    price: 0,
                    rating: 0,
                    quantity: 0,
                    description: '',
                });
            })
            .catch(error => {
                // Handle error
                console.error('Error adding toy:', error);
            });
    };

    return (
        <div className='max-w-7xl mx-auto px-10'>
            <div className="hero">
                <div className="hero-body">
                    <h1 className="text-3xl font-bold">Add A Toy</h1>
                </div>
            </div>
            <div className="container mx-auto my-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label htmlFor="pictureUrl" className="block mb-2 font-bold">Picture URL of the toy:</label>
                            <input type="text" id="pictureUrl" name="pictureUrl" value={formValues.pictureUrl} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
                            <input type="text" id="name" name="name" value={formValues.name} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sellerName" className="block mb-2 font-bold">Seller Name:</label>
                            <input type="text" id="sellerName" name="sellerName" defaultValue={user?.displayName} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sellerEmail" className="block mb-2 font-bold">Seller Email:</label>
                            <input type="email" id="sellerEmail" name="sellerEmail" defaultValue={user?.email} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
                        </div>
                        {/* Category Dynamic Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="category" className="block mb-2 font-bold">Category:</label>
                            <select id="category" name="category" value={formValues.category} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required>
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block mb-2 font-bold">Price:</label>
                            <input type="number" id="price" name="price" value={formValues.price} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rating" className="block mb-2 font-bold">Rating:</label>
                            <input type="number" id="rating" name="rating" min="1" max="5" value={formValues.rating} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block mb-2 font-bold">Available Quantity:</label>
                            <input type="number" id="quantity" name="quantity" value={formValues.quantity} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 font-bold">Detail Description:</label>
                        <textarea id="description" name="description" value={formValues.description} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded" required></textarea>
                    </div>
                    <input type="hidden" id="user_id" name="user_id" value={user?.uid} ref={uid} />
                    <div className="mb-4">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Create;