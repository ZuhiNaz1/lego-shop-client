import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaStar } from "react-icons/fa";
import '@smastrom/react-rating/style.css';
import { Rating } from '@smastrom/react-rating';

const ShopByCategory = ({ categories, handleTabClick, selectedCategoryId }) => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div data-aos="fade-up" data-aos-anchor-placement="top-center">
            <Tabs>
                <TabList>
                    {categories.map(category => (
                        <Tab
                            key={category._id}
                            onClick={() => handleTabClick(category)}
                            selected={selectedCategoryId === category._id}
                        >
                            {category.title}
                        </Tab>
                    ))}
                </TabList>

                {categories.map(category => (
                    <TabPanel key={category._id}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {category.toys &&
                                category.toys.slice(0, 2).map(toy => (
                                    <div key={toy._id} className="p-4 border">
                                        <img
                                            src={toy.pictureUrl}
                                            alt={toy.name}
                                            className="w-full h-auto"
                                        />
                                        <h3 className='font-extrabold text-xl'>{toy.name}</h3>
                                        <p className='flex items-center gap-2 pt-6'> <FaDollarSign></FaDollarSign> <>Price: {toy.price}</> </p>
                                        <p className='flex items-center gap-2'> <FaStar></FaStar><>Rating: <Rating style={{ maxWidth: 150 }} value={toy.rating} readOnly></Rating></> </p>
                                        <Link to={`toys/${toy._id}`}><button className="btn btn-warning mt-4">View Details</button></Link>
                                    </div>
                                ))}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default ShopByCategory;