

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Layout from '@/components/layout';
import Link from 'next/link';

interface ApiImage {
    id: string;
    image_url: string; // Assuming the API response includes 'image_url' for the image path
}

export default function Home() {
    const [images, setImages] = useState<ApiImage[]>([]);

    useEffect(() => {
        // Fetch images from the API
        const fetchImages = async () => {
            try {
                const response = await fetch('https://sites.techvoice.lk/seylan-ai-backend/api/get-completed-images');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setImages(data.images || []); // Adjust based on actual API structure
            } catch (error) {
                console.error('Failed to fetch images:', error);
                setImages([]); // Fallback to empty array
            }
        };


        fetchImages();
    }, []);

    return (
        <>
            <Layout>

                <div className='swiper-page-wrapper'>
                    <div className="container-fluid m-0 background_slider p-0">
                        <div className="slider_container p-0 m-0 position-relative">
                            <Link
                                className="gallery_link"
                                href='/gallery'
                                // href="https://sites.techvoice.lk/seylan-ai-backend/api/get-completed-images"
                            >
                                <h3>Gallery</h3>
                            </Link>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                loop={true}
                                speed={3000}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                }}
                                navigation
                                spaceBetween={0}
                                slidesPerView={4}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 0 },
                                    480: { slidesPerView: 1, spaceBetween: 0 },
                                    640: { slidesPerView: 2, spaceBetween: 0 },
                                    1024: { slidesPerView: 4, spaceBetween: 0 },
                                    1336: { slidesPerView: 4, spaceBetween: 0 },
                                }}
                            >
                                {images.map((image) => (
                                    <SwiperSlide key={image.id} style={{ padding: '10px' }}>
                                        <Link href="#">
                                            <Image
                                                src={image.image_url}
                                                alt={`Image ${image.id}`}
                                                width={250}
                                                height={250}
                                                className="img-fluid rounded-3"
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
