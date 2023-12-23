import { useEffect } from 'react';
import Img from '../../assets/lego-banner.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonial = () => {

    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out',
        });
      }, []);

    return (
        <section data-aos="fade-up" data-aos-anchor-placement="top-center" className="text-neutral-700 dark:text-neutral-300 my-8">

            <section
                className="rounded-md p-6 text-center shadow-lg md:p-12 md:text-left"
                style={{ backgroundImage:  `url(${Img})` }}
            >
                <div className="flex justify-center">
                    <div className="max-w-3xl">
                        <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
                            {/* Testimonial */}
                            <div className="md:flex md:flex-row">
                                <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Ole_Kirk_Christiansen.jpeg/330px-Ole_Kirk_Christiansen.jpeg"
                                        className="rounded-full shadow-md dark:shadow-black/30"
                                        alt="woman avatar"
                                    />
                                </div>
                                <div className="md:ml-6">
                                    <p className="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                                    LEGO® MINDSTORMS® Robot Inventor is a STEM (Science, Technology, Engineering, and Mathematics) learning system that lets you build, code, and control robots. It's perfect for kids and adults who are interested in learning about robotics and engineering.
                                    </p>
                                    <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                                    Ole Kirk Christiansen, The Lego Group, Denmark
                                    </p>
                                    <p className="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                                    Inventor
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    );
};

export default Testimonial;