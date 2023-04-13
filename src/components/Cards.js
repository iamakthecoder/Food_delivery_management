import React, { useState, useEffect } from 'react';
import View from 'react';
import { Button } from './Button';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';

function Cards() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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


  return (
    <div className='cards'>
      <h1>Partner With Us!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <li className='cards__item'>
              <Link className='cards__item__link' to='/restaurantLogin'>
                <figure className='cards__item__pic-wrap' data-category='Restaurant'>
                  <img
                    className='cards__item__img'
                    alt='img'
                    src={require('../images/img2.jpg')}
                  />
                </figure>
                <div className='cards__item__info'>
                    {button && <Button linkto='restaurantLogin' buttonSize='btn--large' buttonStyle='btn--outline'>Login</Button>}
                    {button && <Button linkto='restaurantSignup' buttonSize='btn--large' buttonStyle='btn--outline'>SignUp</Button>}
                </div>
              </Link>
            </li>
          </ul>
          <ul className='cards__items'>
            <li className='cards__item'>
                <Link className='cards__item__link' to='/deliveryAgentLogin'>
                  <figure className='cards__item__pic-wrap' data-category='Delivery Partner'>
                    <img
                      className='cards__item__img'
                      alt='img'
                      src={require('../images/img8.jpg')}
                    />
                  </figure>
                  <div className='cards__item__info'>
                        {button && <Button linkto='deliveryAgentLogin' buttonSize='btn--large' buttonStyle='btn--outline'>Login</Button>}
                        {button && <Button linkto='deliveryAgentSignup' buttonSize='btn--large' buttonStyle='btn--outline'>SignUp</Button>}
                  </div>
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;