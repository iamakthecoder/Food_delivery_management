import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarD from '../NavbarD';

export default function MoreDetailsDeliveryRequest(){

    const id= useParams();
    const [details,setdetails] = useState({});
    const [orderList,setorderList] = useState([]);
    // console.log(id.id);
    const handlemessage = (msg) => {
        setdetails(msg)
        setorderList(msg['orderList'])
    }

    useEffect (() => {fetch('/moreDetailsDeliveryRequest/'.concat(id.id) , {
        method:"POST",
        body:JSON.stringify({'id':id.id}),
      }).then(response => response.json())
        .then(message => (
            console.log(message),
            handlemessage(message)
        ))},[])

        const handleSubmit = (event) => {
            
            
            window.location.href ='/ratingDeliveryAgent/'.concat(id.id)
    
            
           
                  
        }

    
        return (
            <>
<div className="MoreDetailsDeliveryRequest">
    <NavbarD/>
                <div>
                <h1>Order Details</h1><br/><br/>

                <h3>Restaurant Name: {details["restaurantName"]}</h3>
                <h3>Customer Name: {details["customerName"]}</h3>
                <h3>Customer Address: {details["address"]}</h3>

                <br/><br/>
                <h2>Order List</h2>

                <table className='my-table'>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orderList.map((item) => (

                        <tr>
                            <td>{item['name']}</td>
                            <td>{item['frequency']}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                            
                </div>

                <br/><br/><br/>
                <div class="footer">
                <button type="submit" className="btn1" onClick={handleSubmit} style={{width:'10%'}}>Order Delivered</button>
                </div>
                </div>
            </>
        );



}