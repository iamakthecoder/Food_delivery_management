import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GiveOffer(){

    const {cid,oid}= useParams()
    const [issuccess,setissuccess] = useState('');
    const handleSuccess = (msg) => {
        setissuccess(msg)
        if(msg=='Success'){
            
                window.location.href = '/allOffer/'.concat(cid)
            
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
        
        

        useEffect (() => {fetch('/giveOffer/'.concat(cid).concat('/').concat(oid), {
          method:"GET"
        }).then(response => response.json())
          .then(message => (
            // console.log(message),
            handleSuccess(message['message'])
              ))},[])

            
        return (
            <>
              {cid}
            </>
        )

}