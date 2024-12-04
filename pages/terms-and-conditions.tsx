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
                                        1.The platform is powered by Seylan Bank PLC (hereinafter referred to as Seylan) and all
                                        content generated on the platform must comply with the bank’s terms and conditions
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        1.Users of the platform understand and agree that all content generated is subject to
                                        approval by Seylan. Seylan reserves the right to approve or reject any submission at its
                                        sole discretion.

                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        3.Seylan’s decision regarding the approval or rejection of submissions is final and binding.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        4.Users are responsible for ensuring that all information provided on the platform is
                                        accurate. Seylan will not be held responsible for any inaccuracies or errors in the
                                        information provided by users.
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        5.By using this platform, users grant consent to Seylan to use their generated content for
                                        promotional purposes across all media channels
                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        6.Users must comply with all applicable laws and regulations while using the platform.

                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        7.Seylan reserves the right to terminate a user's access to the platform at any time if it
                                        determines that the user has violated these terms and conditions or any applicable laws
                                        or regulations.

                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        8.These terms and conditions are subject to change at any time at the sole discretion of
                                        Seylan.

                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        9.The platform redirects to a third-party host for the User-Generated Content (UGC)
                                        feature. Seylan guarantees that the information stored is safe, as the hosting is
                                        managed by a reputable company. Explicit customer consent is obtained when
                                        third-party infrastructure is used for systems that handle customer data.

                                    </li>
                                    <li className="text-white font-18 mb-3">
                                        10.The platform collects personal data in compliance with the Personal Data Protection Act.
                                        All data handling is aligned with applicable laws and best practices.

                                    </li>
                                </ul>
                                <p className="text-white font-18 mb-3 text-start ms-2 ms-lg-3">
                                    By using this platform, users acknowledge and agree to be bound by these terms and
                                    conditions.
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
