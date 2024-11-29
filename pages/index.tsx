import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Layout from '@/components/layout';
import Link from 'next/link';
import React from 'react';

interface Image {
  [x: string]: string;
  id: string;
  src: string;
  alt: string;
}

export default function Home() {
  const images: Image[] = [
    { id: '1', src: '/seylan/gallery/gallery-1.png', alt: 'Image 1 description' },
    { id: '2', src: '/seylan/gallery/gallery-2.png', alt: 'Image 2 description' },
    { id: '3', src: '/seylan/gallery/gallery-3.png', alt: 'Image 3 description' },
    { id: '4', src: '/seylan/gallery/gallery-4.png', alt: 'Image 4 description' },
    { id: '5', src: '/seylan/gallery/gallery-1.png', alt: 'Image 1 description' },
    { id: '6', src: '/seylan/gallery/gallery-2.png', alt: 'Image 2 description' },
    { id: '7', src: '/seylan/gallery/gallery-3.png', alt: 'Image 3 description' },
    { id: '8', src: '/seylan/gallery/gallery-4.png', alt: 'Image 4 description' },
  ];

  return (
    <>
      <Layout>
        <div className="container-fluid m-0 p-0 background_home">
          <div className="home_slider_container p-0 m-0 position-relative">
            <div>
              <div className="home_slider_image_container image1 p-0 m-0">
                <div className="d-flex justify-content-center align-items-end w-100 hero-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <h1 className="text-center home-text px-2">TURN YOUR DREAM INTO REALITY</h1>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center b-space w-100 sub-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <h2
                      className="text-center px-2 text-white"
                      style={{ fontWeight: 'bold', fontSize: '20px' }}
                    >
                      At Seylan Bank&apos;s Motor Show, unleash your imagination!
                      Share your dream vehicle idea, and our AI will transform it into a
                      stunning visual. Experience innovation like never before,
                      only with Seylan Bank.
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

        <div className="container-fluid m-0 background_slider p-0">
          <div className="slider_container p-0 m-0 position-relative">
            <Link className="gallery_link" href="#">
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
              {images.map((image: Image) => (
                <SwiperSlide key={image.id}>
                  <Link href="#">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={250}
                      height={250}
                      className="img-fluid"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Layout>
    </>
  );
}
