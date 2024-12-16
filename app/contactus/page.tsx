"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { title } from '../components/primitives';
import Nav from '../components/nav1';

const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState<string>('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_l8az1ns', 'template_3p4r9td', form.current, 'Glr3cH7zxYNaYipHH')
        .then(
          () => {
            setMessage('Email sent successfully!');
            if (form.current) {
              form.current.reset();
            }
          },
          (error) => {
            setMessage('Failed to send email.');
          },
        );
    }
  };

  return (
       <>
    <div className='absolute inset-x-0'>
                <Nav/>
            </div>
    <div className="min-h-screen bg-gray-900 text-gray-300  absolute inset-0 ">

    <div className="text-3xl font-bold text-center  bg-gray-900 h-4/5 p-10"  style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/images/30.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                   }}>
     
       
      <h1 className="mt-28 mb-10 ">
      <img src="/images/31.png" alt="Icon" className="inline-block mr-4 h-14 w-14 "/>
        Contact<span className={title({ color: "yellow",size:"sm" })}>  us</span> 
      </h1>
     
      <h2 className='text-2xl px-16 mt-20'>
        " <span className={title({ color: "blue",size:"xm" })}>Guidely</span> , we are committed to providing exceptional service and support. Whether you have questions about our products, need assistance with a recent purchase, or simply want to share your feedback, our team is here to help. Please feel free to reach out to us using the contact form on this page or through the provided contact details. Your satisfaction is our priority, and we look forward to connecting with you soon! "
      </h2> 
     

    </div>
     

   
    <div className="flex w-full">
  {/* Contact Information */}
  <div className="w-1/2 p-10 bg-black-700 mt-24 ml-10">
    <h1 className="text-4xl font-bold text-white mb-6">Contact Information</h1>
    <div className="mb-6">
      <h2 className="text-2xl font-medium text-white">Location</h2>
      <p className="text-gray-400">Sabaragamuwa University of Sri Lanka</p>
    </div>
    <div className="mb-6">
      <h2 className="text-2xl font-medium text-white">Phone</h2>
      <p className="text-gray-400">+94 704951724</p>
    </div>
    <div>
      <h2 className="text-2xl font-medium text-white">Follow Us</h2>
      <div className="flex space-x-4 text-gray-400 mt-4">
        <a href="#" className="hover:text-white"><FaFacebook size={24} /></a>
        <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
        <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
        <a href="#" className="hover:text-white"><FaLinkedin size={24} /></a>
      </div>
    </div>


  </div>
  
  {/* Contact Form */}
  <div className="w-1/2 p-10 bg-black-700 rounded-lg shadow-lg m-10">
  <h1 className="block text-xl font-medium text-gray-300 text-center mb-10">All support inquiries are handled by our support team and <br/>will be answered within 24 hours on workdays.</h1>
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-300 mb-2">Name</label>
        <input type="text" name="user_name" className="w-full border border-gray-700 bg-gray-900 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-300 mb-2">Email</label>
        <input type="email" name="user_email" className="w-full border border-gray-700 bg-gray-900 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-300 mb-2">Message</label>
        <textarea name="message" className="w-full border border-gray-700 bg-gray-900 text-white p-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
      </div>
      <div>
        <input type="submit" value="Send" className="w-full bg-indigo-500 text-white p-4 rounded-lg cursor-pointer hover:bg-indigo-600 transition duration-200" />
      </div>
    </form>
    {message && <div className="mt-4 text-center text-xl text-gray-300">{message}</div>}
  </div>
</div>

       
    </div>
    </>
  );
};

export default ContactUs;
