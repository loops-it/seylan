/* eslint-disable react/no-unescaped-entities */
import Layout from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Terms = () => {


    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_success">
                <div className="home_slider_container p-0 m-0 position-relative">
                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0 ">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                <h2 className="text-white font-36">Terms and Conditions</h2>
                                <ul style={{ listStyle: 'none' }} className='text-start'>
                                    <li className="text-white font-18 mb-3">
                                        1.The platform is powered by Commercial Bank of Ceylon PLC (hereinafter referred to as ComBank) and all images generated on the platform must comply with the bank’s terms and conditions.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        1.Users of the platform understand and agree that all images generated on the platform are subject to approval by ComBank and that ComBank reserves the right to approve or reject any wish at its sole discretion.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        3.ComBank’s decision on the approval or rejection of a wish is final and binding.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        4.Users are responsible for ensuring that all information provided on the platform is accurate. ComBank will not be held responsible for any inaccuracies or errors in the information provided by the users.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        5.By using this platform users grant consent to ComBank to use their generated images for promotional purposes on all media.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        6.Users must comply with all applicable laws and regulations when using the platform.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        7.ComBank reserves the right to terminate a user's access to the platform at any time if it determines that the user has violated these terms and regulations or any other applicable laws or regulations.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        8.These terms and regulations are subject to change at any time at the discretion of ComBank.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        9.We understand that site is directed to a third party host when directed to the UGC platform. and we guarantee that the information stored in it is safe as it is a well known company and it requires explicit customer consent when third-party infrastructure is used for systems exposed to using customer data.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        10.Since there is personal data collected within the site. the site is aligned with the Personal Data Protection Act
                                    </li>
                                </ul>
                                <p className="text-white font-18 mb-3 text-start ms-2 ms-lg-3">
                                    By using this platform, users acknowledge and agree to be bound by these terms and regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Terms;
