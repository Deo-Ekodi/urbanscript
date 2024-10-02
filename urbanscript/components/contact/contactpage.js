'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Doodles = () => (
  <svg
    className="absolute top-0 left-0 w-full h-full opacity-20"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Brown circular rings */}
    <circle cx="20" cy="20" r="15" stroke="blue" fill="none" strokeWidth="3" />
    <circle cx="60" cy="80" r="10" stroke="blue" fill="none" strokeWidth="3" />
    <circle cx="80" cy="30" r="20" stroke="blue" fill="none" strokeWidth="3" />
    <circle cx="30" cy="70" r="12" stroke="blue" fill="none" strokeWidth="3" />
    <circle cx="50" cy="50" r="25" stroke="blue" fill="none" strokeWidth="3" />
    {/* Add more rings as desired */}
  </svg>
);

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
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

  const validateForm = () => {
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

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, phone, message]);

  const sendEmail = async (e) => {
    e.preventDefault();

    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').innerHTML = 'Loading...';

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone_number: phone.trim(),
      message: message.trim(),
    };

    try {
      const response = await axios.post("/api/contact", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      document.getElementById('submitBtn').disabled = false;
      document.getElementById('submitBtn').innerHTML = 'Send Message';

      clearInput();
      Notiflix.Report.success('Success', response.data.message, 'Okay');

    } catch (error) {
      document.getElementById('submitBtn').disabled = false;
      document.getElementById('submitBtn').innerHTML = 'Send Message';

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
      <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 relative overflow-hidden">
        <Doodles />
        <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
          <form onSubmit={sendEmail}>
            <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h1 className="font-bold text-center lg:text-left text-blue-900  text-4xl">Send us a message</h1>
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
                  <p className="text-gray-400">Nyeri, Kenya</p>
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
                    <h2 className="text-2xl">Email</h2>
                    <p className="text-gray-400">urbanscript.ai@gmail.com</p>
                  </div>
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
