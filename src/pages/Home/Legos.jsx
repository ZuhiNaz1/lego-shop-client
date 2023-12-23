import { useEffect, useState } from 'react';
import Spiner from '../../Shared/Spiner';
import Img from '../../assets/lego-banner.jpg'
import LazyLoad from 'react-lazy-load';
import Testimonial from './Testimonial';
import Stats from './Stats';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useTitle from '../../utilities/useTitle';
import Gallery from './Gallery';
import ShopByCategory from './ShopByCategory';

const Legos = () => {
    let [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    useTitle()

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    useEffect(() => {
        // Fetch all categories
        fetch('https://lego-shop-jade.vercel.app/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
                if (data.length > 0) {
                    // Set the first category as selected by default
                    const firstCategoryId = data[0]._id;
                    setSelectedCategoryId(firstCategoryId);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedCategoryId !== '') {
            // Fetch toys by category ID
            fetch(`https://lego-shop-jade.vercel.app/categories/${selectedCategoryId}`)
                .then(response => response.json())
                .then(data => {
                    // Update the toys of the selected category
                    const updatedCategories = categories.map(cat => {
                        if (cat._id === selectedCategoryId) {
                            return { ...cat, toys: data };
                        }
                        return cat;
                    });
                    setCategories(updatedCategories);
                })
                .catch(error =>
                    console.error('Error fetching toys by category ID:', error)
                );
        }
    }, [selectedCategoryId]);

    const handleTabClick = category => {
        setSelectedCategoryId(category._id);
    };

    return (
        <div className='max-w-7xl mx-auto px-10'>
            <Spiner loading={loading}></Spiner>
            <LazyLoad height={384} offset={192}>
                <div data-aos="fade-up" data-aos-anchor-placement="top-center" className="hero md:h-96 mt-4 " style={{ backgroundImage: `url(${Img})`, borderRadius: '8px' }}>
                    <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-2xl">
                            <h3 className="mb-12 text-yellow-400 text-6xl font-bold  flex flex-col gap-5">Welcome to <span className='text-red-700'>LeGO Shop</span> </h3>
                            {/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                            <button className="btn btn-warning">Get Started</button>
                        </div>
                    </div>
                </div>
            </LazyLoad>

            <div className="divider mt-8 md:mt-16 text-2xl md:text-5xl font-extrabold">LeGo Gallery</div>
            <Gallery></Gallery>


            <div className="divider my-4 md:my-12 text-2xl md:text-5xl font-extrabold">Shop Legos By Category</div>
            <ShopByCategory categories={categories} handleTabClick={handleTabClick} selectedCategoryId={selectedCategoryId}></ShopByCategory>
            


            <div className="divider mt-24 text-5xl font-extrabold">Stats</div>
            <Stats></Stats>

            <div className="divider mt-24 text-5xl font-extrabold">Inventor</div>
            <Testimonial data-aos="fade-zoom-in"></Testimonial>

        </div>
    );
};

export default Legos;