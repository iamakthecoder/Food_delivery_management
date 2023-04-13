import React, { useState, useEffect } from 'react';
import {FaTypo3} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";
import {FaBars} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx"
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavbarR() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const handlelogout = (event) => {
    {fetch('/logout' , {
      method:"GET",
    }).then(response => response.json())
      .then(message => (
        window.location.href='/'
      ))}
  } 

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-dashboard'>
          <Link to='/restaurantDashboard' className='navbar-logo' onClick={closeMobileMenu}>
            DashBoard &nbsp; <RxDashboard/>
          </Link>
        </div>
        <button onClick={handlelogout} className='btnlogout' style={{width:'7%'}}>Logout</button>
      </nav>
    </>
  );
}

export default NavbarR;