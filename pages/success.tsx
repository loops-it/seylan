import Layout from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Success = () => {
    const [ambition, setAmbition] = useState('');

    useEffect(() => {
        const aiAmbitionString = localStorage.getItem('userAmbition');
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
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                <h2 className="text-white font-36">Thank you</h2>
                                <p className="text-white font-20 mb-3" style={{fontSize: "22px !important", fontWeight:"600 !important"}}>
                                Await an AI generated image of your future self! 
                                </p>
                                <p className="text-white font-20 mb-3" style={{fontSize: "22px !important", fontWeight:"600 !important"}}>
                                Within 48 hours we will be sending it to your e-mail and/or WhatsApp number.
                                </p>
                                <Image
                                    src={'/correct.png'}
                                    className="correct-img mb-5"
                                    alt=""
                                    width={107}
                                    height={107}
                                ></Image>

                                <Link href="/futureDescription" className='d-flex justify-content-center align-items-center'>
                                    <button className="submit-btn-success my-3 px-3" type="submit">
                                    Click to see your path to becoming a {ambition}
                                    </button>
                                </Link>

                                {/* <p className="text-white font-18 mb-3">
                                    Do you like to see your path to becoming a {ambition}?
                                </p> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Success;
