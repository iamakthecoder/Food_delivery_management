import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import NavbarC from '../NavbarC'

export default function PersonalData() {

  const [details,setdetails] = useState({});

  // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);

    useEffect (() => { fetch('/personalData' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            setdetails(message)
        ))},[])
  return (
    <>
    <div className="PersonalData">
    <NavbarC></NavbarC>
    <h1> Personal Details</h1>
    <table className='my-table' style={{width:'50%',height:'40%'}}>
      <thead>
      <tr>
        <th>Customer Name</th>
        <th>{details['name']}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Address</td>
        <td>{details['address']}</td>
      </tr>
      <tr>
        <td>Area</td>
        <td>{details['area']}</td>
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
        <td>Mobile Number</td>
        <td>{details['mobileNumber']}</td>
      </tr>
      </tbody>
    </table>
        </div>
    </>
  )
}