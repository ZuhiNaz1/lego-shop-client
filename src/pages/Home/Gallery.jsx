import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = () => {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out',
        });
      }, []);

    return (
        <div data-aos="fade-up" className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
                <div className="w-1/2 p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1563823251941-b9989d1e8d97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                </div>
                <div className="w-1/2 p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1577113398331-d843d3341a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    />
                </div>
                <div className="w-full p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
                <div className="w-full p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1589254066007-898d52d910d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    />
                </div>
                <div className="w-1/2 p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                </div>
                <div className="w-1/2 p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.unsplash.com/photo-1607297737950-b3c024a71a69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Gallery;