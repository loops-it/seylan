import Layout from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
    id: string;
    image_id: string;
    image_url: string;
}

const Gallery = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://sites.techvoice.lk/seylan-ai-backend/api/get-gallery-images');
                console.log('API response:', response.data);
                setImages(response.data.images); // Adjust based on API structure
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_success">
                <div className="home_slider_container p-0 m-0 position-relative">
                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5">
                                <h2 className="text-white font-36">GALLERY</h2>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 px-5">
                                    {images.length > 0 ? (
                                        images.map((image: Image) => (
                                            <div className="p-2" key={image.id}>
                                                <Link href={"/view-image/" + image.image_id}>
                                                    <Image
                                                        src={image.image_url}
                                                        alt={`Image ${image.id}`}
                                                        width={200}
                                                        height={200}
                                                        className="mb-5"
                                                    />
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Gallery;
