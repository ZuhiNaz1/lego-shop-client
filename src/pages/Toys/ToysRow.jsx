import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegTimesCircle, FaEye } from "react-icons/fa";

const ToysRow = ({ toy, myToy, handleUpdate, handleDelete }) => {

    const { _id, sellerName, name, category, price, quantity } = toy;
    const [categories, setCategories] = useState([]);
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
    return (
        <tr className='text-center'>
            <td className="border py-2">{sellerName}</td>
            <td className="border py-2">{name}</td>
            <td className="border py-2">{getCategoryNameById(category)}</td>
            <td className="border py-2">{price}</td>
            <td className="border py-2">{quantity}</td>
            <td className="border py-2">
                {myToy ?
                    <div className='flex gap-3 items-center justify-center'>
                        <Link to={`https://legoshop-1768a.web.app/home/toys/${_id}`} exact><button className=""> <FaEye></FaEye> </button></Link>
                        <button onClick={() => handleUpdate(toy)}> <FaEdit></FaEdit> </button>
                        <button onClick={() => handleDelete(_id)} className="">
                            <FaRegTimesCircle></FaRegTimesCircle>
                        </button>
                    </div> : <Link to={`https://legoshop-1768a.web.app/home/toys/${_id}`} exact><button className=""> <FaEye></FaEye> </button></Link>}
            </td>
        </tr>
    );
};

export default ToysRow;