import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import NavbarC from '../NavbarC';

export default function RecommendedRestaurant() {

  const [rlist,setrlist] = useState([]);


  useEffect(() => {
    fetch('/recommendedRestaurant' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            console.log(message['restaurantList']),
            setrlist(message['restaurantList'])
        ))},[])

        
          const handleSubmit = (event,params) => {
                window.location.href='/displayFoodItems/'.concat(params);
          }
  
      return (
  <>
      <div className="RecommendedRestaurant">
        <NavbarC/>
        <h1>Recommended Restaurants</h1> 
        
        <table className='my-table' style={{width:'40%'}}>
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Rating</th>
              <th>Order Now</th>
            </tr>
          </thead>
          <tbody>
            {rlist.map((item) => (
                        <tr>
                        <td>{item['name']}</td>
                        <td>{item['ratingValue']}</td>
                        <td><button type="submit" className="btn1" onClick={event => handleSubmit(event,item['restaurantId'])} style={{width:'35%'}}>Menu</button></td>
                      </tr>
            ))}
          </tbody>
        </table>
      </div>
  </>
      );
  }