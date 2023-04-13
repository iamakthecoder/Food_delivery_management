import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NavbarR from '../NavbarR'
function SendDeliveryRequest(){
    const temp = useParams()
    // console.log(temp)
    

    const [deliveryagents,setdeliveryagents]=useState([])
    // const [inputs, setInputs] = useState({});
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values , [name]:value}))
    //   }

    const handlemessage = (msg) => {
        // console.log(msg)
        if (msg == "Success"){
            window.location.href='/pendingOrdersRestaurant'
        }
        else{

        }
    }

    const handleClick = (event) => {
        // console.log(temp.id)
        fetch('/sendDeliveryRequest/'.concat(temp.id) , {
            method:"POST",
            body:JSON.stringify({'id':temp.id}),
          }).then(response => response.json())
            .then(message => (
                // setdeliveryagents(message['deliveryAgentList'])
                // console.log(message['message']),
                handlemessage(message['message'])
            ))
    }


        useEffect(() => {fetch('/nearbyDeliveryAgents/'.concat(temp.id) , {
          method:"GET",
        //   body:JSON.stringify(inputs),
        }).then(response => response.json())
          .then(message => (
                // console.log(message['deliveryAgentList']),
              setdeliveryagents(message['deliveryAgentList'])
          ))},[])
      

    return (

        <div className="SendDeliveryRequest">
          <NavbarR/>
            <h1>Send Delivery Request</h1>
              <table className='my-table'>
                <thead>
                    <tr>
                      <th>Delivery Agent Name</th>
                      <th>Mobile Number</th>
                      <th>Rating</th>
                      <th>Area</th>
                    </tr>
                </thead>
                <tbody>
                {deliveryagents.map((m) => (
                  <tr>
                    <td>{m['name']}</td>
                    <td>{m['mobileNumber']}</td>
                    <td>{m['ratingValue']}</td>
                    <td>{m['area']}</td>
        </tr>
    ))}
                </tbody>
              </table>
              <br/><br/><br/><br/>

        <div class="footer">
            <button type="submit" className="btn1" onClick={handleClick} style={{width:'15%'}}>Send Delivery Request</button>
        </div>
        </div>

    );
}

export default SendDeliveryRequest