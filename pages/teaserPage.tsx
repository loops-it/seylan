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
        <div className="container-fluid m-0 p-0 background_home">
          <div className="home_slider_container p-0 m-0 position-relative">
            <div>
              <div className="home_slider_image_container image1 p-0 m-0">
                <div className="d-flex justify-content-center align-items-end w-100 hero-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <h1 className="text-center home-text px-2">YOU HAVE THE POWER TO CHANGE YOUR FUTURE WITH SEYLAN</h1>
                    
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center b-space w-100 sub-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <h2
                      className="text-center px-2 text-white"
                      style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginTop: '150px',
                        width: '67%',
                      }}
                    >
                      At Seylan Bank&apos;s Motor Show, unleash your imagination! Share your
                      dream vehicle idea, and our AI will transform it into a stunning visual.
                      Experience innovation like never before, only with Seylan Bank.
                    </h2>
                    <Link
                      href="/getUserDetails"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <button type="submit" className="mt-3 submit-btn-home">
                        Next
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </Layout>
    </>
  );
}
