import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarD from '../NavbarD'

function DeliveryAgentDashboard() {
    
    const [username,setusername] = useState('');

    const handlemessage = (msg) => {
    setusername(msg)
    }

      // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);


    useEffect (() => {fetch('/deliveryAgentDashboard' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message["user"])
            handlemessage(message["name"])
        ))},[])

    const Redirect1 = (event) => {
        window.location.href='/personalDataAgent'
    }

    const Redirect2 = (event) => {
        window.location.href='/markLocation'                       //not in backend
    }

    const Redirect3 = (event) => {
        window.location.href='/seeDeliveryRequest'        //not in backend
    }

    const Redirect4 = (event) => {
        window.location.href='/acceptDeliveryRequest'     //not in backend
    }

    const Redirect5 = (event) => {
        window.location.href='/currentOrder'           //not in backend
    }

    return(
        <>
        <div className="DeliveryAgentDashboard">
        <NavbarD/>
            <div className="Welcome">
            <h1>Welcome {username}</h1>    
            </div>     
            <br/><br/><br/>
            <div className='ddashcont'>
            <div className="ddashoptions">
                <button onClick={Redirect1} className="ddashbuttons">Personal Details</button>
            </div>
            <div className="ddashoptions">
                <button onClick={Redirect2} className="ddashbuttons">Mark Location</button>
            </div>
            <div className="ddashoptions">
                <button onClick={Redirect3} className="ddashbuttons">See Delivery Request</button>
            </div>
            {/* <div className="ddashoptions">
                <button onClick={Redirect4} className="ddashbuttons">Accept Delivery Request</button>
            </div>
            <div className="ddashoptions">
                <button onClick={Redirect5} className="ddashbuttons">See Current Order</button>
            </div> */}
            </div>
            </div>
        </>
    );
}

export default DeliveryAgentDashboard;