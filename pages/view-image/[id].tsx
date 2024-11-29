import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/router';


const ShareImage = () => {
    const [ambition, setAmbition] = useState('');
    const [images, setImages] = useState([]);

    const router = useRouter();
    const { id } = router.query;
    console.log(id)


    useEffect(() => {
    }, [images])

    useEffect(() => {
        
    
        const getImage = async()=>{
            
            const response = await fetch("https://dashboard.yourvibe.lk/api/get-image-details", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                            {
                                image_id: id,
                            }
                        ),
                    });
    
                    const dataBackend = await response.json();
                    if (response.status !== 200) {
                        throw dataBackend.error || new Error(`Request failed with status ${response.status}`);
                    }

                    setImages(dataBackend.image.final_image)
                    console.log("imge : ", dataBackend)
                    console.log(images)
        }
        if (id) {
            getImage();
          }
    }, [id, images])


    useEffect(() => {
        const aiAmbitionString = localStorage.getItem("ambition");
        if (aiAmbitionString) {
            setAmbition(aiAmbitionString);
            // localStorage.removeItem('ambition');
        }
    }, []);
    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_success">
                <div className="home_slider_container p-0 m-0 position-relative">

                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0 ">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5">
                                <h2 className="text-white font-36">GALLERY</h2>
                                <div className="d-flex justify-content-center align-items-center px-5">
                                    <div className="image-share position-relative">
                                        <Image src={"https://dashboard2.yourvibe.lk/final_images/"+images} className='mb-5' style={{ borderRadius: "15px" }} alt='' width={200} height={200} ></Image>
                                        {/* <div className="social-share d-flex flex-column p-2">
                                            <div className="icon-wrapper p-2 mb-2">
                                                <FaFacebookF width={25} height={25} className='icon-share' />
                                            </div>
                                            <div className="icon-wrapper p-2">
                                                <FaWhatsapp width={25} height={25} className='icon-share' />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <Link href={"https://dashboard2.yourvibe.lk/final_images/"+images} download className='d-flex justify-content-center align-items-center'>
                            <button className="submit-btn my-3 px-3" type="submit">DOWNLOAD</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ShareImage