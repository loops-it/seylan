import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Layout from '@/components/layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';



interface Image {
  [x: string]: string;
  id: string;
  // Add other properties as needed
}



export default function Home() {

  // const [images, setImages] = useState([]);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
  }, [images])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://dashboard.yourvibe.lk/api/get-completed-images');
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [])



  return (
    <>

      <Layout>
        <div className="container-fluid m-0 p-0 background_home">
          <div className="home_slider_container p-0 m-0 position-relative">

            <div>
              <div className="home_slider_image_container image1 p-0 m-0 ">
                <div className="d-flex justify-content-center align-items-end  w-100 hero-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <Image src="/etxt.png" alt="" className="hero-image mb-lg-2" width={800} height={600} />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center b-space w-100 sub-container">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container">
                    <h2 className="text-center px-2 text-white" style={{ fontWeight: "bold" }}>
                      Interested? Check the future you NOW
                    </h2>
                    <Link href={'/getUserDetails'} className='d-flex justify-content-center align-items-center'>
                      <button type="submit" className="mt-3 submit-btn-home"
                      >
                        Get Started
                      </button></Link>
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
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
                1336: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
              }}
            >
              {/* {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <Link href={"/view-image/"+image.image_id}>
                  <Image src={"https://it-marketing.website/vibe-backend/final_images/"+image.final_image} alt="" width={250} height={250} className="img-fluid" />
                  </Link>
                </SwiperSlide>
              ))} */}
              {images.map((image: Image) => (
                <SwiperSlide key={image.id}>
                  <Link href={"/view-image/" + image.image_id}>
                    <Image src={"https://dashboard2.yourvibe.lk/final_images/" + image.final_image} alt="" width={250} height={250} className="img-fluid" />
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
