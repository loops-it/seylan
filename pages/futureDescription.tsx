import Layout from '@/components/layout'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const BotResponse = () => {

    const [aiMessage, setAiMessage] = useState('');

    useEffect(() => {
        const storedAiMessage = localStorage.getItem('aiGeneratedMessage');
        if (storedAiMessage) {
            setAiMessage(storedAiMessage);
            //   localStorage.removeItem('aiMessage');
        }
    }, []);

    const lines = aiMessage.split('\n');

    return (
        <>
            <Layout>
                <div className="container-fluid m-0 p-0 background_description">
                    <div className="home_slider_container p-0 m-0 position-relative">

                        <div>
                            <div className="home_slider_image_container min-height image1 p-0 m-0 ">
                                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                                    <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100 pt-3 pt-lg-5">
                                        <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 pt-lg-5 py-lg-5 w-100 d-flex justify-content-center align-items-center position-relative">
                                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box-future ">
                                                <h2 className="text-white font-36">FUTURE YOU</h2>
                                                <div className=" col-12   px-2 px-lg-5 mt-2 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                    {/* <p className="text-white font-18 mb-5">{aiMessage}</p> */}
                                                    <ul style={{listStyle:"none"}} className='text-start'>
                                                        {lines.map((line, index) => (
                                                            line.trim() !== "" && <li className="text-white font-18 mb-3" key={index}>{line}</li>
                                                        ))}
                                                    </ul>
                                                    <Link href={'/'} className='d-flex justify-content-center align-items-center'>
                                                        <button className="submit-btn my-3 px-3">FINISH</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default BotResponse