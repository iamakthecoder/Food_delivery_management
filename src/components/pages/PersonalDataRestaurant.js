import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import NavbarR from '../NavbarR';

export default function PersonalDataRestaurant() {

  const [details,setdetails] = useState({});
  const [isrec,setisrec] = useState('')

  // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);


  useEffect(() => {
    fetch('/personalData' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            // handlerec(message['isRecommended']),
            setdetails(message)
        ))},[])
  return (
    <>
    <div className="PersonalDataRestaurant">
    <NavbarR/>
      <div className='Welcome'>
        <h1>Welcome {details['name']}</h1>
      </div>
      <table className='my-table' style={{height:'40vh',width:'40%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>{details['name']}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Email</td>
            <td>{details['email']}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{details['area']}</td>
          </tr>
          <tr>
            <td>Is Recommended</td>
            <td>{String(details['isRecommended'])}</td>
          </tr>
          <tr>
            <td>Rating Value</td>
            <td>{details['ratingValue']}</td>
          </tr>
          <tr>
            <td>Restaurant Id</td>
            <td>{details['restaurantId']}</td>
          </tr>
        </tbody>
      </table>
      </div>
      </>
  );
}