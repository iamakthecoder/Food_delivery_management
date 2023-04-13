import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarC from '../NavbarC'

function RecentOrderCustomer(){
    const [orders,setorders] = useState([]);

    const handlemessage = (msg) => {
        setorders(msg)
    }

    
    useEffect(() => {fetch('/recentOrderCustomer' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message["user"])
            handlemessage(message['recentOrderList'])
        ))},[])
    
        function handleButtonClick(menuURL) {
            window.location.href = "/moreDetailsOrder/".concat(menuURL)
          }
    
    return(
        <>
        
            <div className='RecentOrderCustomer'>
                <NavbarC/>
            <h1>Recent Orders</h1>
            <table className='my-table' style={{width:'50%'}}>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>More Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                    <tr>
                        <td>{order['restaurantName']}</td>
                        <td>{order['orderValue']}</td>
                        <td>{order['updateMessage']}</td>
                        <td><button  className='btn1' onClick={() => handleButtonClick(order['orderId']) }>More Details</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

        </>
    )

}

export default RecentOrderCustomer;