import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarC from '../NavbarC'

function CustomerDashboard() {
    
    const [username,setusername] = useState('');

    const handlemessage = (msg) => {
    setusername(msg)
    }

      // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);


    useEffect(() => {fetch('/customerDashboard' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message["user"])
            handlemessage(message["name"])
        ))},[])

    const Redirect1 = (event) => {
        window.location.href='/allRestaurants'
    }

    const Redirect2 = (event) => {
        window.location.href='/personalData'
    }

    const Redirect3 = (event) => {
        window.location.href='/recommendedRestaurant'        //not in backend
    }

    // const Redirect4 = (event) => {
    //     window.location.href='/allRestaurant'
    // }

    const Redirect5 = (event) => {
        window.location.href='/presentOrders'           //not in backend
    }

    const Redirect6 = (event) => {
        window.location.href='/pastOrders'                      //not in backend
    }

    return(
        <div className='CustomerDashboard'>
            <NavbarC/>
            <div className="Welcome">
            <h1>Welcome {username}</h1>    
            </div>
            <br/><br/><br/>
            <div className="cdashcont">     
            <div className="cdashoptions">
                <button onClick={Redirect1} className="cdashbuttons">Order Now</button>
            </div>
            <div className="cdashoptions">
                <button onClick={Redirect2} className="cdashbuttons">Personal Details</button>
            </div>
            <div className="cdashoptions">
                <button onClick={Redirect3} className="cdashbuttons">Recommeded Restaurants</button>
            </div>
            {/* <div className="options">
                <button onClick={Redirect4}>All Restaurants</button>
            </div> */}
            <div className="cdashoptions">
                <button onClick={Redirect5} className="cdashbuttons">Present Orders</button>
            </div>
            <div className="cdashoptions">
                <button onClick={Redirect6} className="cdashbuttons">Past Orders</button>
            </div>
            </div>
            </div>
    );
}

export default CustomerDashboard;