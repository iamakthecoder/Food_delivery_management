import React from 'react'
import { useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import NavbarD from '../NavbarD';


export default function AcceptDeliveryRequest() {
    const id= useParams()
    const [inputs, setInputs] = useState({});
    const [issuccess,setissuccess] = useState('');

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values , [name]:value}))
    }

    const handleSuccess = (msg) => {
        setissuccess(msg)
        // console.log(msg)
        if(msg=='Success'){
          window.location.href = '/moreDetailsDeliveryRequest/'.concat(id.id)
        }
        else{
            window.location.href = '/seeDeliveryRequest'
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        inputs["id"]=id
        // console.log(inputs)

        fetch('/acceptDeliveryRequest/'.concat(id.id) , {
          method:"POST",
          body:JSON.stringify(inputs),
        }).then(response => response.json())
          .then(message => (
            // console.log(message),
            handleSuccess(message['message'])
              ))
              
    }

    
        return(
          <div className="AcceptDeliveryRequest">
            <NavbarD/>
            <div className="regularform">
            <h1>Accept Delivery Request</h1>
            <br/>
            <form onSubmit={handleSubmit}>
            <div className="form-body">
                <div className="estimated time to reach restaurant">
                    <input  type="number" min="0" id="number" name="rtime" className="form__input" placeholder="Time to reach restaurant" value={inputs.rtime} onChange={handleChange}/>
                </div>
                <br/>
                <div className="estimated time to reach customer">
                    <input className="form__input" type="number" min="0" name="ctime" id="ctime" placeholder="Time to reach customer" value={inputs.ctime} onChange={handleChange}/>
                </div>
            </div>
            <br/>
            <div class="footer">
                <button type="submit" className="btn1">Accept</button>
            </div>
            </form>
        </div>
        </div>
        )
}