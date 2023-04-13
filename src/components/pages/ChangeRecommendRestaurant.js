import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ChangeRecommendRestaurant(){

    const {id}= useParams()
    const [issuccess,setissuccess] = useState('');
    const handleSuccess = (msg) => {
        setissuccess(msg)
        if(msg=='Success'){
            
                window.location.href = '/allRestaurantAdmin'
            
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
        
        

        useEffect (() => {fetch('/changeRecommendRestaurant/'.concat(id), {
          method:"POST",
          body:JSON.stringify(id),
        }).then(response => response.json())
          .then(message => (
            // console.log(message),
            handleSuccess(message['message'])
              ))},[])

            
        return (
            <>
                {id}
            </>
        )

}