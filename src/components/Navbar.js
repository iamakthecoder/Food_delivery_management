import React, { useState, useEffect } from 'react';
import {FaTypo3} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";
import {FaBars} from "react-icons/fa";
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            DoorDine <FaTypo3/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {click ? <FaTimes/> : <FaBars/>}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about-us'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/customerLogin'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to='/customerSignUp'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button linkto='/customerLogin' buttonSize='btn--large' buttonStyle='btn--outline'>Login</Button>}
          {button && <Button linkto='/customerSignup' buttonSize='btn--large' buttonStyle='btn--outline'>SignUp</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;