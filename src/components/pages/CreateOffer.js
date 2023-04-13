import React from 'react'
import { useState, useEffect } from 'react';
import NavbarA from '../NavbarA'

export default function CreateOffer(){
        const [details,setdetails] = useState([]);
        const handlemessage = (msg) => {
            setdetails(msg)
        }
    
        
        useEffect(() => {fetch('/createOffer' , {
            method:"GET",
          }).then(response => response.json())
            .then(message => (
                // console.log(message["user"])
                handlemessage(message['offerList'])
            ))},[])
        
                
        const handleRestaurantsClick = () => {
            window.location.href='/addOffer';
        };



          return(
            <>
            <div className='CreateOffer'>
            <NavbarA/>
                <h1>
                    Promotional Offers
                </h1><br/><br/><br/><br/>

                <div>

                   


                <table className='my-table' style={{width:'40%'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Discount</th>
                            <th>Upper Limit</th>
                            <th>Offer Id</th>
                        </tr>
                    </thead>
                    <tbody>

                    {details.map((item) => (
                        <tr>
                            <td>{item["name"]}</td>
                            <td>{item["discount"]}</td>
                            <td>{item["upperLimit"]}</td>
                            <td>{item["offerId"]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/><br/><br/>
                <button onClick={handleRestaurantsClick} className='btn1' style={{width:'15%'}}>Create Offer</button>
                </div>
                </div>

            </>
            
          )



}