import React,{useState,useEffect} from 'react';
import '../../App.css';
import NavbarA from '../NavbarA'

export default function AllDeliveryAgents() {

    const [deliveryAgents,setdeliveryAgents] = useState([]);
    
    
  
      useEffect(() => {fetch('/allDeliveryAgents' , {
          method:"GET",
        }).then(response => response.json())
          .then(message => (
              // console.log(message),
              setdeliveryAgents(message['deliveryAgentList'])
          ))},[])
  
          function handleButtonClick(menuURL,menu) {
            window.location.href = "/delete/".concat(menuURL).concat(menu)
          }
    return (
      <>
      <div className='AllDeliveryAgents'>
<NavbarA/>
        <h2>Delivery Agents</h2>
        <table className='my-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>Area</th>
              <th>Remove Agent</th>
            </tr>
          </thead>

          <tbody>


          {deliveryAgents.map((deliveryAgents) => (
             
            <tr>
              <td>{deliveryAgents['name']}</td>
              <td>{deliveryAgents['email']}</td>
              <td>{deliveryAgents['mobileNumber']}</td>
              <td>{deliveryAgents['gender']}</td>
              <td>{deliveryAgents['area']}</td>
              <td><button onClick={() => handleButtonClick("deliveryAgent/",deliveryAgents["deliveryAgentId"])} className='btn1'>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>



      </div>
  
          
      </>
    )
  }