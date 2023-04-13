import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import NavbarD from '../NavbarD';

export default function PersonalDataDeliveryAgent() {

  const [details,setdetails] = useState({});
  // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);

    useEffect(() => {fetch('/personalData' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
          // console.log(message)
          setdetails(message)
        ))},[])
  return (
    <div className="PersonalDataDeliveryAgent">
      <NavbarD/>
      <h1>Personal Details</h1>
      <table className='my-table' style={{width:'50%',height:'40%'}}>

      <thead>
      <tr>
        <th>Delivery Agent Name</th>
        <th>{details['name']}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Delivery Agent Id</td>
        <td>{details['deliveryAgentId']}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{details['email']}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>{details['gender']}</td>
      </tr>
      <tr>
        <td>Status (Availability)</td>
        <td>{String(details['isAvailable'])}</td>
      </tr>
      <tr>
        <td>Mobile Number</td>
        <td>{details['mobileNumber']}</td>
      </tr>
      <tr>
        <td>Rating</td>
        <td>{details['ratingValue']}</td>
      </tr>
      </tbody>
      </table>
      </div>

);
  }
