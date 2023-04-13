import React,{useState,useEffect} from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import NavbarA from '../NavbarA';

export default function AllOffer() {
    const {id}= useParams()
    const [offers,setoffers] = useState([]);
    const [restid,setrestid]=useState('')
  
      // useEffect(() => {
    //   fetch('/').then(
    //     response => response.json()
    //   ).then(data => setInitialData(data))
    // }, []);
  
  
      useEffect(() => {fetch('/allOffer/'.concat(id) , {
          method:"GET",
        }).then(response => response.json())
          .then(message => (
              // console.log(message),
              setoffers(message['offerList'])
          ))},[])
  
        //   function handleButtonClick(menuURL) {
        //     window.location.href = "/menuAdmin/".concat(menuURL)
        //   }
          function handleAddClick(customerId,offerId) {
              window.location.href = "/giveOffer/".concat(customerId).concat('/').concat(offerId)
          }
        //   function handleChangeClick(menuURL) {
        //       window.location.href = "/changeRecommendRestaurant/".concat(menuURL)
        //   }
    return (
      <>

      <div className='AllOffers'>
        <NavbarA/>
        <h1>Offers</h1>
        <table className='my-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Discount</th>
              <th>Upper Limit</th>
              <th>Add Offer</th>
            </tr>
          </thead>

          <tbody>

          {offers.map((offer) => (
            <tr>
              <td>{offer['name']}</td>
              <td>{offer['discount']}</td>
              <td>{offer['upperLimit']}</td>
              <td><button class="btn1" onClick={() => handleAddClick(id,offer["offerId"])} className='btn1' style={{width:'100%'}}>Add Offer</button></td>
            </tr>
          ))}
          </tbody>

        </table>
      </div>
  
          
      </>
    )
  }