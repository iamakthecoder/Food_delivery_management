import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import MyVideo from "../videos/video1.mp4"

function HeroSection() { 
  return (
    <div className='hero-container'>
      <video width="100%" height="100%" autoPlay loop muted>
        <source src={MyVideo} type="video/mp4" />
      </video>
      <h1>Delivering Happiness, one meal at a time.</h1>
      <p>Order now!</p>
    </div>
  );
}

export default HeroSection;