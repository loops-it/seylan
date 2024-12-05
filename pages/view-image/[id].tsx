// import Layout from '@/components/layout';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
// import { useRouter } from 'next/router';
// import Head from "next/head";
// const [downloadStatus, setDownloadStatus] = useState("");




// const ShareImage = () => {
//     const [ambition, setAmbition] = useState('');
//     const [imageURL, setImageURL] = useState('');

//     const router = useRouter();
//     const { id } = router.query;

//     useEffect(() => {
//         const getImage = async () => {
//             try {
//                 const response = await fetch("https://sites.techvoice.lk/seylan-ai-backend/api/get-image-details", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ image_id: id }),
//                 });

//                 const dataBackend = await response.json();
//                 if (response.status !== 200) {
//                     throw dataBackend.error || new Error(`Request failed with status ${response.status}`);
//                 }

//                 const image = dataBackend.image[0]?.image_url || '';
//                 setImageURL(image);
//             } catch (error) {
//                 console.error("Error fetching image details:", error);
//             }
//         };

//         if (id) {
//             getImage();
//         }
//     }, [id]);

//     useEffect(() => {
//         const aiAmbitionString = localStorage.getItem("ambition");
//         if (aiAmbitionString) {
//             setAmbition(aiAmbitionString);
//         }
//     }, []);

//     return (
//         <Layout>
//             <div className="container-fluid m-0 p-0 background_success">
//                 <div className="home_slider_container p-0 m-0 position-relative">
//                     <div>
//                         <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0 ">
//                             <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5">
//                                 <h2 className="text-white font-36">GALLERY</h2>
//                                 <div className="d-flex justify-content-center align-items-center px-5">
//                                     <div className="image-share position-relative">
//                                         {imageURL && (
//                                             <Image
//                                                 src={imageURL}
//                                                 className="mb-5"
//                                                 style={{ borderRadius: "15px" }}
//                                                 alt="Gallery Image"
//                                                 width={250}
//                                                 height={250}
//                                                 quality={100}
//                                                 priority
//                                             />
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                             {imageURL && (
//                                 <a
//                                     href={imageURL}
//                                     download={'GFG'}
//                                     className="d-flex justify-content-center align-items-center">download
                                    
//                                 </a>


//                             )}
// <button className="submit-btn my-3 px-3" type="button">DOWNLOAD</button>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default ShareImage;


import Layout from '@/components/layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ShareImage = () => {
    const [ambition, setAmbition] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [downloadStatus, setDownloadStatus] = useState("");

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const getImage = async () => {
            try {
                const response = await fetch("https://sites.techvoice.lk/seylan-ai-backend/api/get-image-details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image_id: id }),
                });

                const dataBackend = await response.json();
                if (response.status !== 200) {
                    throw dataBackend.error || new Error(`Request failed with status ${response.status}`);
                }

                const image = dataBackend.image[0]?.image_url || '';
                setImageURL(image);
            } catch (error) {
                console.error("Error fetching image details:", error);
            }
        };

        if (id) {
            getImage();
        }
    }, [id]);

    useEffect(() => {
        const aiAmbitionString = localStorage.getItem("ambition");
        if (aiAmbitionString) {
            setAmbition(aiAmbitionString);
        }
    }, []);

    const downloadImage = async () => {
        if (!imageURL) return;
    
        try {
            // Fetch the image
            const response = await fetch(imageURL);
            if (!response.ok) {
                throw new Error(`Failed to fetch image. Status: ${response.status}`);
            }
    
            // Convert response to blob
            const blob = await response.blob();
    
            // Create a temporary download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "image.png"; // Provide the desired filename
            link.style.display = 'none';
            document.body.appendChild(link);
    
            // Trigger the download
            link.click();
    
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
    
            setDownloadStatus("Downloaded successfully!");
        } catch (error) {
            console.error("Error downloading the image:", error);
            setDownloadStatus("Failed to download.");
        }
    };
    

    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_success">
                <div className="home_slider_container p-0 m-0 position-relative">
                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5">
                                <h2 className="text-white font-36">GALLERY</h2>
                                <div className="d-flex justify-content-center align-items-center px-5">
                                    <div className="image-share position-relative">
                                        {imageURL && (
                                            <Image
                                                src={imageURL}
                                                className="mb-5"
                                                style={{ borderRadius: "15px" }}
                                                alt="Gallery Image"
                                                width={250}
                                                height={250}
                                                quality={100}
                                                priority
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {imageURL && (
                                <button
                                    className="submit-btn my-3 px-3"
                                    type="button"
                                    onClick={downloadImage}
                                >
                                    DOWNLOAD
                                </button>
                            )}
                            {downloadStatus && <p>{downloadStatus}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ShareImage;

