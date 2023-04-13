import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarR from '../NavbarR'

function PendingOrderRestaurant(){
    const [orders,setorders] = useState([]);

    const handlemessage = (msg) => {
        setorders(msg)
    }

    
    useEffect(() => {fetch('/recentOrderRestaurant' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            handlemessage(message['recentOrders'])
        ))},[])
    
        function handleButtonClick(menuURL) {
            window.location.href = "/orderDetailRestaurant/".concat(menuURL)
          }
          
    
    
    return(
        <>
        
            <div className="PendingOrderRestaurant">
                <NavbarR/>
            <h1>Pending Orders</h1>

            <table className='my-table' style={{width:'50%'}}>
                <thead>
                    <tr>
                    <th>Customer Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>More Details</th>
                    </tr>
                </thead>

                <tbody>

                {orders.map((order) => (

<tr>

                    <td>{order['customerName']}</td>
                    <td>{order['orderValue']}</td>
                    <td>{order['updateMessage']}</td>
                    <td>    <button onClick={() => handleButtonClick(order['orderId'])} className='btn1'>More Details</button></td>

</tr>
                ))}

                </tbody>
            </table>

            </div>

        </>
    )

}

export default PendingOrderRestaurant;