
import React from 'react';
import '../../App.css';
import Navbar from '../Navbar';

export default function AboutUs() {

  return (
    <>
    <div className="AboutUs">
      <Navbar/>
      <h1 className='aboutusheader'>About Us</h1>

      <p className='aboutuspara'>Welcome to DoorDine, a food delivery service management system. We are a team of dedicated and experienced developers who have come together to provide a seamless and user-friendly food delivery experience for customers, restaurants, delivery agents, and management.</p>

<p className="aboutuspara">Our mission is to bridge the gap between customers and their favorite restaurants, by providing a one-stop-shop for all their food delivery needs. We understand that food delivery is not just about getting the food to your doorstep, but also about providing an experience that is hassle-free and enjoyable.</p>.

<p className="aboutuspara">Our team has spent countless hours researching and developing the best possible solution for our users. We have leveraged the latest technology to build a platform that is fast, reliable, and secure. Our user interface is designed to be intuitive and easy to use, ensuring that everyone can navigate through the app with ease.</p>

<p className="aboutuspara">We believe in transparency and communication, which is why we have provided a feedback system for our users. We are always listening to our customers' feedback and suggestions, and strive to improve our services with each passing day.</p>

<p className="aboutuspara">Thank you for choosing DoorDine as your preferred food delivery service. We look forward to serving you and making your food delivery experience unforgettable.</p>
      </div>
    </>
  )
}