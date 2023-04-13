import React, {useState, useEffect} from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import NavbarR from '../NavbarR'


function AcceptReject(props){

    const handlemessage = (msg) => {
        if(msg == "Success"){
            window.location.href='/pendingOrdersRestaurant'
        }
        else{
            
        }
    }
    const handleClick1 = (event) => {
        const id=props.det

        window.location.href='/giveEstimatedTime/'.concat(id)
    }
    const handleClick2 = (event) => {
        fetch('/updateStatus0' , {
            method:"POST",
            body:JSON.stringify({'ordid':props.det})
          }).then(response => response.json())
            .then(message => (
                handlemessage(message['message'])
            ))
        
        
    }
    return(
        <>
            <button onClick={handleClick1} className='btn1' style={{width:'10%'}}>Accept</button>
            <br/>
            <button onClick={handleClick2} className='btn1' style={{width:'10%'}}>Reject</button>
        </>
    );
}

function FoodPrepared(props){
    const handleClick3 = (event) => {
        window.location.href='/sendDeliveryRequest/'.concat(props.det)
    }
    return(
        <button onClick={handleClick3} className='btn1' style={{width:'10%'}}>Food Prepared</button>
    );
}

function OutforDelivery(props){

    const [success,setsuccess]=useState('')

    const handleSuccess = (msg) => {
        setsuccess(msg)
        // console.log(msg)
        if (msg == "Success"){
            window.location.href='/pendingOrdersRestaurant'
        }
        else{

        }
    }

    const handleClick4 = (event) => {

        // console.log(props.det)
        fetch('/updateStatus3' , {
            method:"POST",
            body:JSON.stringify(props.det),
          }).then(response => response.json())
            .then(message => (
                // console.log(message['message']),
                handleSuccess(message['message'])
            ))

    }
    return(
        <button onClick={handleClick4} className="btn1" style={{width:'10%'}}>Out For Delivery</button>
    );
}


// 0 - ask for accept reject
// 1 - accepted or rejected show updateMessage if updateMessage = 'Accepted. Preparing Food'  'Rejected'
// 2 - if delivery request sent then state 2 
// 3 - out for delivery 
//4 - when delivered



function OrderDetailsRestaurant(){

    const id = useParams()

    const [details,setdetails] = useState({});
    const [orderList,setorderList] = useState([]);
    const [level,setlevel] = useState('')

    const handlemessage = (msg) => {
        setdetails(msg)
        setorderList(msg['orderList'])
        setlevel(msg['currentOrder']['updateLevel'])
    }

    
    useEffect(() => {fetch('/orderDetailRestaurant/:id' , {
        method:"POST",
        body:JSON.stringify(id),
      }).then(response => response.json())
        .then(message => (
            console.log(message),
            handlemessage(message)
        ))},[])
    
        // function handleButtonClick(menuURL) {
        //     window.location.href = "/orderDetailRestaurant/".concat(menuURL)
        //   }
    
    let message;

    if(level == '0'){
        message = <AcceptReject det={details['currentOrder']['orderId']}/>
    }
    else if(level == '1'){
        message=<FoodPrepared det={details['currentOrder']['orderId']}/>
    }
    else if(level == '2'){
        message=<h2>Delivery Request Sent</h2>
    }
    else if(level == '3'){
        message=<OutforDelivery det={details['currentOrder']['orderId']}/>
    }
    else if(level == '4'){
        message=<h1>Order on its Way!!</h1>
    }
    
    return(
        <>
        <div className="OrderDetailsRestaurant">
            <NavbarR/>
            <div>
            <h1>Order Details</h1>
            </div>
            <br/><br/><br/>
            <div>
                <h2>
                Customer : {details['customerName']}
                </h2>
            </div>
            <br/>
            <div>
                <table class='my-table' style={{width:'40%'} }>
                    <thead>
                    <tr>
                    <th>
                        Item
                    </th>
                    <th>
                        Price per Item
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Cost
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {orderList.map((m) => (
          <tr>
            <td>{m['name']}</td>
            <td>{m['pricePerItem']}</td>
            <td>{m['frequency']}</td>
            <td>{m['frequency']*m['pricePerItem']}</td>
            </tr>
            
      ))}</tbody>


                </table>
<br/><br/>
                <br/>
                <table class='my-table' style={{width:'30%'}}>
                    <thead>
                    <tr>
                        <th>Base Price</th>
                        <th>Delivery Charge</th>
                        <th>Discount</th>
                        <th>Amount to Pay</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{details['cost']}</td>
                        <td>{details['deliveryCharge']}</td>
                        <td>{details['discount']}</td>
                        <td>{details['final']}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/><br/><br/>
            <div>
                {message}
            </div>
            </div>
        </>
    )

}

export default OrderDetailsRestaurant;