import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarC from '../NavbarC'

function MoreDetailsOrder(){
    const id = useParams()

    const [details,setdetails] = useState({});
    const [orderList,setorderList] = useState([])
    useEffect(() => {fetch('/moreDetailsOrder/:id' , {
        method:"POST",
        body:JSON.stringify(id),
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            setdetails(message),
            setorderList(message['orderList'])
        ))},[])



    return (
        <>
            <div className="MoreDetailsOrder">
                <NavbarC/>
            <h1>Order Details</h1>
            <br/><br/><br/>
                        <h2>Date&time: {details["orderDateTime"]}</h2>
                        <br/><br/><br/>
                        <h2>Restaurant Name: {details["restaurantName"]}</h2>
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
                    <br/><br/><br/>
                    <h2>
                        Base Price : {details['cost']}<br/>                        
                        Discount : {details["discount"]}<br/>
                        Delivery Charge : {details["deliveryCharge"]}<br/>
                        Total : {details["final"]}</h2>

            </div>

        </>
    )
}
export default MoreDetailsOrder;







