import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import NavbarD from '../NavbarD'

export default function SeeDeliveryRequest() {

    const [requests,setrequests] = useState([]);
    
    
  
      useEffect(() => {fetch('/seeDeliveryRequest' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            
            setrequests(message["deliveryRequestList"])
        ))},[])

        function handleButtonClick(menuURL) {
            window.location.href = "/acceptDeliveryRequest/".concat(menuURL)
          }

    return (
        <div className='SeeDeliveryRequest'>
            <NavbarD/>
            <h1>
                Delivery Requests
            </h1><br/><br/><br/>
            <table className='my-table' style={{width:'40%'}}>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Customer Name</th>
                        <th>Accept</th>
                    </tr>
                </thead>
                <tbody>
                {requests.map((request) => (
                    <tr>
                        <td>{request['restaurant']["name"]}</td>
                        <td>{request['customer']['address']}</td>
                        <td>{request['customer']['name']}</td>
                    <button onClick={() => handleButtonClick(request['orderId']) } className='btn1'>Accept</button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );


}