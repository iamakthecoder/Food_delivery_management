import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteUser(){

    const {userType,id}= useParams()
    const [issuccess,setissuccess] = useState('');
    let dict={}
    dict["id"]=id
    dict["userType"]=userType
  

        const handleSuccess = (msg) => {
            setissuccess(msg)
            if(msg=='Success'){
                // console.log(userType)
                if(userType == "customer"){
                    window.location.href = '/allCustomers'
                }
                if(userType == "deliveryAgent"){
                    window.location.href = '/allDeliveryAgents'
                }
                if(userType == "restaurant"){
                    window.location.href = '/allRestaurantAdmin'
                }
            }
            else{
                console.log(msg)
              
            }
          }
    
        
        //   useEffect(() => {
            // fetch('/home').then(
            //   response => response.json()
            // ).then(data => setInitialData(data))
        //   }, []);
            
            
    
            useEffect (() => {fetch('/delete/'.concat(userType).concat('/').concat(id) , {
              method:"POST",
              body:JSON.stringify(dict),
            }).then(response => response.json())
              .then(message => (
                // console.log(message),
                handleSuccess(message['message'])
                  ))},[])
                  
        

        
        return (
            <>

            </>
        )



}