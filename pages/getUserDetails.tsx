/* eslint-disable react/jsx-no-undef */
import Layout from '@/components/layout';
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import { FiUpload } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

interface Props {
  dirs: string[];
}

const UserDetails: NextPage<Props> = ({ dirs }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('');
  const [ambition, setAmbition] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [resId, setResId] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [savedImageUrl, setSavedImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [profession, setProfession] = useState('');
  const [phoneNoAttempt, setPhoneNoAttempt] = useState(false);
  const [phoneNoAttemptMsg, setPhoneNoAttemptMsg] = useState('');
  const [selectedCarImage, setSelectedCarImage] = useState('');
  const [selectedCar, setSelectedCar] = useState(Number);
  const [selectedCarName, setSelectedCarName] = useState('');


  const [spellError, setSpellError] = useState(false);
  // const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const router = useRouter();


  const handleSelectedCarImage = ((imagePath: string, selectedId: number, selectedCarName: string) => {
    console.log('this is image path: ', imagePath);
    console.log('this is image id :', selectedId);
    console.log('this is image car name :', selectedCarName);


    setSelectedCar(selectedId);
    setSelectedCarImage(imagePath);
    setSelectedCarName(selectedCarName);

  });



  // document.querySelectorAll('.vehicle').forEach((img) => {
  //   img.addEventListener('click', () => {
  //     document.querySelectorAll('.vehicle').forEach((img) => {
  //       img.classList.remove('selected');
  //     });
  //     img.classList.add('selected');
  //   });
  // });

  useState({})


  // get latest dir and update variables
  useEffect(() => { }, [
    name,
    gender,
    country,
    ambition,
    email,
    phoneNo,
    aiMessage,
    resId,
    savedImageUrl,
    isChecked,
    selectedFile,
    profession,
  ]);

  // useEffect(() => {
  //   if (dirs.length > 0) {
  //     const latestDir = dirs[dirs.length - 1];
  //     setSavedImageUrl(
  //       `https://combank-vibe-bay.vercel.app/images/${latestDir}`,
  //     );
  //   }
  // }, [dirs]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files) {
  //         const file = event.target.files[0];
  //         setSelectedImage(URL.createObjectURL(file));
  //         setSelectedFile(file);
  //     }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('file Added change');
    if (event.target.files) {
      const file = event.target.files[0];
      if (file && file.size <= 3 * 1024 * 1024) {
        // 3MB limit
        setSelectedImage(URL.createObjectURL(file));
        setSelectedFile(file);
        setFileSizeError('');
      } else {
        setFileSizeError('File size limit exceeded (maximum 3MB)');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    // event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        setSelectedImage(URL.createObjectURL(file));
        setSelectedFile(file);
        setFileSizeError('');
      } else {
        setFileSizeError('File size limit exceeded (maximum 5MB)');
      }
    }
  };

  // checkbox
  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePhoneNumber = (phoneNo: string) => {
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneNo)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myImage', selectedFile);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  // handle function
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('file Added');
    // await handleUpload()

    if (isChecked) {
      const handleData = async () => {

        try {
          const phoneNumberWithoutSpaces = phoneNo.replace(/\s/g, '');
          console.log("tel : ", phoneNumberWithoutSpaces);

          if (!selectedFile) return;
          const formData = new FormData();
          formData.append('savedImageUrl', selectedFile);
          formData.append('name', name);
          formData.append('gender', gender);
          formData.append('profession', profession);
          // formData.append('ambition', ambition);
          formData.append('email', email);
          formData.append('phoneNo', phoneNumberWithoutSpaces);
          formData.append('vehicle_type', selectedCarName);

          console.log('form data : ', formData);
          // data to backend

          if (validateEmail(email)) {
            console.log(
              `data : ${name} ,${gender} ,${email} , ${phoneNumberWithoutSpaces}, ${ambition}, ${profession} , ${country}, ${selectedFile} `,
            );

            // https://dashboard.yourvibe.lk/api/save-customer-data
            const response = await fetch(
              'https://sites.techvoice.lk/seylan-ai-backend/api/save-customer-data',
              {
                method: 'POST',
                body: formData,
              },
            );

            const dataBackend = await response.json();
            console.log("response: ", dataBackend)


            if (response.status !== 200) {
              throw (
                dataBackend.error ||
                new Error(`Request failed with status ${response.status}`)
              );
            }



            if (dataBackend.status === 'fail') {
              setPhoneNoAttempt(true);
              setPhoneNoAttemptMsg(dataBackend.message);
              console.log(dataBackend.message);
              setIsLoading(false);
            } else {
              const resCustomerId = dataBackend.id;
              setResId(resCustomerId);
              console.log('respons id : ', resCustomerId);


              setIsLoading(false);
              router.push('/success');
              return;
            }
            return;



          } else {
            setEmailError('Invalid email address');
            setIsLoading(false);
          }


        } catch (error) {
          console.error(error);
        }
      };
      handleData();
    }
  };

  // store in local storage
  useEffect(() => {
    if (aiMessage) {
      localStorage.setItem('aiGeneratedMessage', aiMessage);
      localStorage.setItem('userAmbition', ambition);
    }
  }, [aiMessage, ambition]);

  return (
    <>
      <Layout>
        <div className="container-fluid m-0 p-0 background_user_details">
          <div className="home_slider_container p-0 m-0 position-relative">
            <div>
              <div className="home_slider_image_container image1 p-0 m-0 ">
                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                  <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100">
                    <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 py-lg-5 my-3 my-lg-5 w-100 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                        <div id="blur_background"></div>
                        <h2 className="text-white font-36 ps-5 ms-5">
                          ENTER YOUR DETAILS
                        </h2>
                        <form
                          onSubmit={handleSubmit}
                          className=" col-12 user-form  mt-2 mb-5 d-flex flex-column justify-content-center align-items-center"
                        >
                          <input
                            type="text"
                            required
                            placeholder="Name"
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            onChange={(e) => setName(e.target.value)}
                          />

                          <select
                            name="gender"
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            required
                            value={gender}
                            onChange={(e) => setGender(e.currentTarget.value)}
                          // onChange={(e) => console.log(e)}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                          </select>

                          <input
                            type="email"
                            required
                            placeholder="Email"
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <input
                            type="text"
                            required
                            placeholder="Your Whatsapp Number"
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            onChange={(e) => {
                              setPhoneNo(e.target.value);
                              setPhoneError('');
                            }}
                            onBlur={(e) => validatePhoneNumber(e.target.value)}
                          />
                          {/* onBlur={(e) => validatePhoneNumber(e.target.value)} */}
                          {phoneError && (
                            <span className="error-message text-danger bg-white px-2 py-1 rounded mb-2 mt-0">
                              {phoneError}
                            </span>
                          )}
                          <select
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            required
                            name="proffession"
                            value={profession}
                            onChange={(e) => setProfession(e.currentTarget.value)}
                          >
                            <option value="">Profession</option>
                            <option value="Engineer">Engineer</option>
                            <option value="teacher">teacher</option>
                            <option value="nurse">nurse</option>
                            <option value="gamer">gamer</option>
                            <option value="architect">architect</option>
                            <option value="accountant">accountant</option>
                            <option value="musician">musician</option>
                            <option value="dancer">dancer</option>
                            <option value="actor">actor</option>
                            <option value="military">military</option>
                          </select>

                          {/* <input
                            type="text"
                            required
                            placeholder="Email"
                            className="mb-2 py-3 px-3 w-100 transparent-input"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError('');
                            }}
                            onBlur={(e) => validateEmail(e.target.value)}
                          /> */}
                          {/* onBlur={(e) => validateEmail(e.target.value)} */}
                          {/* {emailError && (
                            <span className="error-message text-danger bg-white px-2 py-1 rounded mb-2 mt-0">
                              {emailError}
                            </span>
                          )} */}



                          {/* {spellError && (
                            <span className="spell-error-message error-message text-danger bg-white px-2 py-1 rounded mb-2 mt-0">
                              Please check your spelling.
                            </span>
                          )} */}
                          {/* <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setAmbition(e.target.value)}>
                                                        <option value="">Select Your Ambition</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Engineer">Engineer</option>
                                                        <option value="Teacher">Teacher</option>
                                                        <option value="Lawyer">Lawyer</option>
                                                        <option value="Nurse">Nurse</option>
                                                        <option value="Accountant">Accountant</option>
                                                        <option value="Architect">Architect</option>
                                                        <option value="Scientist">Scientist</option>
                                                        <option value="Programmer">Programmer</option>
                                                        <option value="Chef">Chef</option>
                                                        <option value="Artist">Artist</option>
                                                        <option value="Musician">Musician</option>
                                                        <option value="Writer">Writer</option>
                                                        <option value="Designer">Designer</option>
                                                        <option value="Police officer">Police officer</option>
                                                        <option value="Firefighter">Firefighter</option>
                                                        <option value="Pilot">Pilot</option>
                                                        <option value="Psychologist">Psychologist</option>
                                                        <option value="Social worker">Social worker</option>
                                                        <option value="Veterinarian">Veterinarian</option>
                                                        <option value="Dentist">Dentist</option>
                                                        <option value="Pharmacist">Pharmacist</option>
                                                        <option value="Journalist">Journalist</option>
                                                        <option value="Economist">Economist</option>
                                                        <option value="Entrepreneur">Entrepreneur</option>
                                                        <option value="Financial advisor">Financial advisor</option>
                                                        <option value="Marketing manager">Marketing manager</option>
                                                        <option value="Consultant">Consultant</option>
                                                        <option value="Electrician">Electrician</option>
                                                        <option value="Plumber">Plumber</option>
                                                        <option value="Carpenter">Carpenter</option>
                                                        <option value="Mechanic">Mechanic</option>
                                                        <option value="Farmer">Farmer</option>
                                                        <option value="Librarian">Librarian</option>
                                                        <option value="Athlete">Athlete</option>
                                                        <option value="Photographer">Photographer</option>
                                                        <option value="Filmmaker">Filmmaker</option>
                                                        <option value="Fashion designer">Fashion designer</option>
                                                        <option value="Researcher">Researcher</option>
                                                    </select> */}

                          {/* <label htmlFor="upload-input" className="hidden-file-input d-flex justify-content-center">
                                                        <input
                                                            type="file"
                                                            id="upload-input"
                                                            onChange={handleFileChange}
                                                            required
                                                        />
                                                        <div className="d-flex rounded justify-content-center align-items-center curser-pointer" style={{ width: '200px' }}>
                                                            {
                                                                selectedImage ? (
                                                                    <img src={selectedImage} alt="" />
                                                                ) : (
                                                                    <span className='text-white mb-2 py-3 px-3 w-100 transparent-input'>Select Image <FiUpload style={{ width: '25px' }} /></span>
                                                                )
                                                            }
                                                        </div>
                                                    </label> */}
                          <div className="d-flex flex-column-reverse flex-lg-row">
                            <div className="col-12 ">
                              <label
                                htmlFor="upload-input"
                                className="hidden-file-input d-flex justify-content-center"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                              >
                                <input
                                  type="file"
                                  id="upload-input"
                                  onChange={handleFileChange}
                                  style={{ maxHeight: '100px', width: 'auto' }}
                                />
                                <div className="d-flex transparent-input transparent-img-input flex-column justify-content-center align-items-center py-3">
                                  <div
                                    className="d-flex flex-column rounded justify-content-center align-items-center cursor-pointer"
                                    style={{ maxHeight: '100px', width: 'auto' }}

                                  >
                                    {selectedImage ? (
                                      <img src={selectedImage} alt="" style={{ maxHeight: '100px', width: 'auto' }} />
                                    ) : (
                                      <span
                                        className="text-white mb-2 py-3 px-3 w-100  d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: '200px !important' }}
                                      >
                                        <h5>Drop or Select Image</h5>{' '}
                                        <p style={{ width: "300px !important" }}>(Upload a clear image of you where your features are clearly shown)</p>{' '}
                                        <FiUpload style={{ width: '35px' }} />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </label>
                            </div>
                            {/* <div className="col-12 col-lg-3 p-2">
                            <Image src="/sample.jpg" className='' alt='' width={100} height={100} ></Image>
                            <p className='mb-0 text-white text-center'>Sample Image</p>
                            </div> */}
                          </div>
                          {fileSizeError && (
                            <span className="error-message text-danger bg-white px-2 py-1 rounded mb-2 mt-2">
                              {fileSizeError}
                            </span>
                          )}
                          {/* <div className="d-flex flex-row text-white text-start px-3 mt-2">
                              <p>Select Your Dream Vehicle Type</p>
                            </div>
                            
                            <div className="d-flex flex-row vehicle-box text-white text-start px-3 mt-2">
                                
                                  <img className='vehicle mx-2' src="/seylan/vehicle_types/Benz.png" alt="" />
                                  <img className='mx-2' src="/seylan/vehicle_types/BMW.png" alt="" />
                                  <img className='mx-2' src="/seylan/vehicle_types/ferrari.png" alt="" />
                                  <img className='mx-2' src="/seylan/vehicle_types/Lambogini.png" alt="" />
                                  <img className='mx-2' src="/seylan/vehicle_types/porche.png" alt="" />
                               
                            </div> */}





                          <div className='vehicle-row'>
                            <h6 className='text-white my-4'>Select Your Dream Vehicle Type</h6>
                            <div className="column">
                              <img
                                onClick={() => handleSelectedCarImage('/seylan/vehicle_types/Benz.png', 1, 'Benz')}
                                src="/seylan/vehicle_types/Benz.png"
                                alt="Benz"
                                className={`vehicle ${selectedCar === 1 ? 'selected' : ''}`}
                                id='1'
                              />
                              <img
                                onClick={() => handleSelectedCarImage('/seylan/vehicle_types/BMW.png', 2, 'BMW')}
                                src="/seylan/vehicle_types/BMW.png"
                                alt="BMW"
                                className={`vehicle ${selectedCar === 2 ? 'selected' : ''}`}
                                id='2'
                              />
                              <img
                                onClick={() => handleSelectedCarImage('/seylan/vehicle_types/Ferrari.png', 3, 'Ferrari')}
                                src="/seylan/vehicle_types/ferrari.png"
                                alt="Ferrari"
                                className={`vehicle ${selectedCar === 3 ? 'selected' : ''}`}
                                id='3'
                              />
                              <img
                                onClick={() => handleSelectedCarImage('/seylan/vehicle_types/Lambogini.png', 4, 'Lamborghini')}
                                src="/seylan/vehicle_types/Lambogini.png"
                                alt="Lamborghini"
                                className={`vehicle ${selectedCar === 4 ? 'selected' : ''}`}
                                id='4'
                              />
                              <img
                                onClick={() => handleSelectedCarImage('/seylan/vehicle_types/porche.png', 5, 'Porsche')}
                                src="/seylan/vehicle_types/porche.png"
                                alt="Porsche"
                                className={`vehicle ${selectedCar === 5 ? 'selected' : ''}`}
                                id='5'
                              />
                            </div>

                          </div>

                          <label className="d-flex flex-row text-white text-start px-3 mt-2">
                            <input
                              type="checkbox"
                              className="checkbox-style me-2"

                              onChange={handleCheckboxChange}
                              required
                            />
                            <p> I hereby agree to the terms and conditions</p>
                          </label>
                          {phoneNoAttempt && (
                            <span className="error-message text-danger bg-white px-2 py-1 rounded mb-2 mt-0">
                              {phoneNoAttemptMsg}
                            </span>
                          )}

                          <div className='d-flex justify-content-center align-items-center'>
                            <button
                              className="submit-btn text-center d-flex justify-content-center align-items-center my-3 px-3"
                              type="submit"
                            >
                              {isLoading ? (
                                <LoadingDots color="#fff" />
                              ) : (
                                <p className="mb-0">NEXT</p>
                              )}
                            </button>
                          </div>
                        </form>

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
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), '/public/images'));
    const props: Props = { dirs: dirs as string[] };
    return { props };
  } catch (error) {
    const props: Props = { dirs: [] };
    return { props };
  }
};







export default UserDetails;
