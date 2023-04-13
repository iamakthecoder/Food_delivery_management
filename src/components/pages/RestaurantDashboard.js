import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarR from '../NavbarR'

function RestaurantDashboard() {
    
    const [username,setusername] = useState('');

    const handlemessage = (msg) => {
    setusername(msg)
    }

          // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);

    useEffect(() => {fetch('/restaurantDashboard' , {
        method:"POST",
      }).then(response => response.json())
        .then(message => (
            // console.log(message["user"])
            handlemessage(message["name"])
        ))},[])

    const Redirect1 = (event) => {
        window.location.href='/personalDataRestaurant'
    }

    const Redirect2 = (event) => {
        window.location.href='/menu'
    }

    const Redirect3 = (event) => {
        window.location.href='/pendingOrdersRestaurant'           //not in backend
    }

    const Redirect4 = (event) => {
        window.location.href='/PastOrderRestaurant'                      //not in backend
    }
    
    // const Redirect5 = (event) => {
    //     window.location.href='/CurrentMenu'                      //not in backend
    // }

    return(
        <div className="RestaurantDashboard">  
            <NavbarR/>
            <div className="Welcome">
            <h1>Welcome {username}</h1>    
            </div>   
            <div className='rdashcont'>  
            <div className="rdashoptions">
                <button onClick={Redirect1} className='rdashbuttons'>Personal Details</button>
            </div>
            <div className="rdashoptions">
                <button onClick={Redirect2} className='rdashbuttons'>Menu</button>
            </div>
            <div className="rdashoptions">
                <button onClick={Redirect3} className='rdashbuttons'>Pending Orders</button>
            </div>
            <div className="rdashoptions">
                <button onClick={Redirect4} className='rdashbuttons'>Past Orders</button>
            </div>
            </div>
        </div>
    );
}

export default RestaurantDashboard;