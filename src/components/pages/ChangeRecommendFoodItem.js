import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ChangeRecommendFoodItem(){

    const {rid,fid}= useParams()
    const [issuccess,setissuccess] = useState('');
    const handleSuccess = (msg) => {
        setissuccess(msg)
        if(msg=='Success'){
            
                window.location.href = '/MenuAdmin/'.concat(rid)
            
        }
        else{
            // console.log(msg)
          
        }
      }

    
    //   useEffect(() => {
        // fetch('/home').then(
        //   response => response.json()
        // ).then(data => setInitialData(data))
    //   }, []);
        
        

        useEffect (() => {fetch('/changeRecommendFoodItem/'.concat(rid).concat('/').concat(fid), {
          method:"GET"
        }).then(response => response.json())
          .then(message => (
            // console.log(message),
            handleSuccess(message['message'])
              ))},[])

            
        return (
            <>
                {rid}
            </>
        )

}