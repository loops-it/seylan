// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";




// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };

// const WebcamCapture = () => {
//     const webcamRef = useRef<Webcam>(null);
    
//     const [url,setUrl] = useState('')

//     const capturePhoto = () => {
//         console.log('capture btn clicked');
//         if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();
//             console.log('imageSrc:', imageSrc);
//             setUrl(imageSrc || '');

//         } else {
//             console.log('webcam null error')
//         }
//     }
//     return (
//         <div>
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 height={720}
//                 screenshotFormat="image/jpeg"
//                 width={1280}
//                 videoConstraints={videoConstraints}
//             />

//             <button onClick={capturePhoto}>Capture</button>
//         </div>
//     )
// }

// export default WebcamCapture;