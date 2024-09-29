'use client';

import React, { useState, useEffect } from 'react';

import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Whether animation should happen only once
        });
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const clearErrors = () => {
        setErrors([]);
    };

  // Function to validate the form
  const validateForm = () => {
    // Check if all fields are non-empty
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      message.trim() !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

    const clearInput = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
    };

    // Real-time validation whenever a field changes
    useEffect(() => {
        validateForm();
    }, [firstName, lastName, email, phone, message]);


    const sendEmail = async (e) => {
        e.preventDefault();
      
        // Disable the submit button and show loading state
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';
      
        // Create a JSON object with the required fields
        const payload = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone_number: phone.trim(), // Include the phone number field correctly
          message: message.trim(),
        };

        try {
          // Send the POST request using axios with JSON payload
          const response = await axios.post("/api/contact", payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          // Update the button state back to normal
          document.getElementById('submitBtn').disabled = false;
          document.getElementById('submitBtn').innerHTML = 'Send Message';
      
          // Clear the input fields and show success notification
          clearInput();
          Notiflix.Report.success('Success', response.data.message, 'Okay');
      
        } catch (error) {
          document.getElementById('submitBtn').disabled = false;
          document.getElementById('submitBtn').innerHTML = 'Send Message';
      
          // Handle error responses and set errors if any
          if (error.response && error.response.status === 500) {
            Notiflix.Report.failure(
              'An error occurred',
              error.response.data.message,
              'Okay'
            );
          }
      
          if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
        }
      };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <form onSubmit={sendEmail}>
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Send us a message</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input 
                                        name="first_name" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="First Name*" 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                                </div>
                                
                                <div>
                                    <input 
                                        name="last_name" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="Last Name*"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                                </div>

                                <div>
                                    <input 
                                        name="email"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="email" 
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyUp={clearErrors}   
                                    />
                                    {errors && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div>
                                    <input
                                        name="phone_number" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="number" 
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        onKeyUp={clearErrors}
                                    />
                                    {errors && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                                </div>
                            </div>
                            <div className="my-4">
                                <textarea 
                                    name="message" 
                                    placeholder="Message*" 
                                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyUp={clearErrors}
                                ></textarea>
                                {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>
                            <div className="my-2 w-1/2 lg:w-2/4">
                                <button type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline" disabled={!isFormValid}>
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <div className="flex my-4 w-2/3 lg:w-3/4">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Office Address</h2>
                                    <p className="text-gray-400">Ilo Awela, Ota, Ogun State</p>
                                </div>
                            </div>
                    
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Call Us</h2>
                                    <p className="text-gray-400">Tel: +254702872249</p>
                                    <div className='mt-5'>
                                        <h2 className="text-2xl">Send an E-mail</h2>
                                        <p className="text-gray-400">## ##</p>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="rounded-full flex justify-center bg-white h-8 text-blue-900 w-8 mx-1 text-center pt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'>
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                    </svg>
                                </div>
                                <div className="rounded-full flex justify-center bg-white h-8 text-blue-900 w-8 mx-1 text-center pt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'>
                                        <path d="M21 12.5c0 .548-.451 1-1 1s-1-.452-1-1 .451-1 1-1 1 .452 1 1zm-1-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM10 18c-1.657 0-3-1.343-3-3h-2c0 2.757 2.243 5 5 5v-2zm0-1c-1.105 0-2-.895-2-2h-2c0 2.21 1.79 4 4 4v-2zm-6.162-1.638c1.179 0 2.16-.981 2.16-2.16s-.981-2.16-2.16-2.16S1 10.462 1 11.642s.981 2.16 2.16 2.16zm4.53-5.068c-.805-.575-1.81-.936-2.83-.936-1.66 0-3 1.34-3 3h2c0-1.08.61-2 1.54-2.5.619-.298 1.3-.451 2.05-.451.547 0 1.057.086 1.542.244C7.678 9.59 4.68 10.5 1 10.5c1.51 1.738 2.807 3.996 3.01 6.394C6.66 17.257 8.117 18 10 18c2.676 0 5-1.324 5-4s-2.324-4-5-4zm1-2c0 .531-.146 1.029-.4 1.466C12.188 9.22 10.15 9 9 9c-.929 0-1.789.154-2.608.432.368-.656.967-1.208 1.693-1.643C10.488 7.356 11.495 7 12 7c2.209 0 4 1.791 4 4s-1.791 4-4 4c-1.152 0-2.21-.452-2.995-1.167C10.659 13.104 11 12.169 11 11.5c0-.5-.244-.951-.598-1.234C12.837 10.51 15 13.25 15 16c0 2.21-1.79 4-4 4v2c3.313 0 6-2.686 6-6 0-2.351-1.346-4.507-3.359-5.598C13.784 9.224 14 9.936 14 10.5c0 1.02-.226 2.074-.733 3.029C16.217 14.106 19 16.285 19 19c0 3.313-2.686 6-6 6v2c4.418 0 8-3.582 8-8s-3.582-8-8-8z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;

