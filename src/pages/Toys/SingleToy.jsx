import { useLoaderData } from 'react-router-dom';
import useTitle from '../../utilities/useTitle';
import { FaDollarSign, FaRegCheckSquare, FaStar, FaUserTie, FaEnvelope, FaInfo } from "react-icons/fa";
import '@smastrom/react-rating/style.css';
import { Rating } from '@smastrom/react-rating';

const SingleToy = () => {
    useTitle();
    const toy = useLoaderData();
    const { pictureUrl, sellerName, sellerEmail,name, rating, price, quantity, description } = toy;
    return (
        <div>
            <div className="hero bg-base-300 p-10">
                <div className="hero-content flex-col lg:flex-row-reverse gap-24">
                    <img src={pictureUrl} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{name}</h1>
                        <p className='flex items-center gap-2 pt-6'> <FaDollarSign></FaDollarSign> <>Price: {price}</> </p>
                        <p className='flex items-center gap-2'> <FaStar></FaStar><>Rating: <Rating style={{maxWidth:150}} value={rating} readOnly></Rating></> </p>
                        <p className='flex items-center gap-2'> <FaRegCheckSquare></FaRegCheckSquare> <>Quantity: {quantity}</> </p>
                        <p className='flex items-center gap-2'> <FaUserTie></FaUserTie> <>Seller Name: {sellerName} </> </p>
                        <p className='flex items-center gap-2'> <FaEnvelope></FaEnvelope> <>Seller Email: {sellerEmail} </> </p>
                        <p className="flex items-center gap-2 mt-2 bg-white rounded-lg p-2"> <FaInfo></FaInfo> Details: {description}</p>
                        <p></p>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleToy;