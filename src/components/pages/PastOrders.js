import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarC from '../NavbarC'

function PastOrders(){
    const [orders,setorders] = useState([]);

    const handlemessage = (msg) => {
    setorders(msg)
    }

    function handleChangeClick(restaurantId) {
        window.location.href = "/rateRestaurant/".concat(restaurantId)
    }

    useEffect(() => {fetch('/pastOrder' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            console.log(message["pastOrderlist"]),
            handlemessage(message["pastOrderlist"])
        ))},[])

        let rating;
    
        const callrating = (updtlvl,id) => {
            if(updtlvl == 5){
                rating=<button className="btn1" onClick={() => handleChangeClick(id)}  style={{width:'20%'}}>Rate Restaurant and Delivery Agent</button>
            }
        }


    return(
        <>
            <div className="PastOrders">
                <NavbarC/>
            <h1>Order Details</h1><br/><br/><br/>
            <ul>
                {orders.map((pastOrder) => (
                <li key={['pastOrderlist']}>
                    <ul>
                        <h3>
                        OrderId: {pastOrder["orderId"]} &nbsp;&nbsp;
                        Date&time: {pastOrder["orderDateTime"]}
                        </h3>
                        <br/><br/>
                        <h3>Status: {pastOrder['updateMessage']}</h3>
                        
                        <br>
                        </br>
                            {callrating(pastOrder['updateLevel'],pastOrder['orderId'])}
                            {rating}
                        
                        

                        <table className='my-table'>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price per Item</th>
                                </tr>
                            </thead>

                            <tbody>
                            {pastOrder.orderList.map((item) => (
                                <tr>
                                    <td>{item['name']}</td>
                                    <td>{item['frequency']}</td>
                                    <td>{item['pricePerItem']}</td>
                                </tr>
                        
                    ))}

                            </tbody>
                        </table>
                        <br/><br/>
                        <h3>                        Discount: {pastOrder["dicountValue"]}&nbsp;
                        Delivery charge: {pastOrder["deliveryCharge"]}&nbsp;
                        Base Price : {pastOrder["orderValue"]}</h3>

                    </ul>
                    <br/><br/>
                    <h6 className="gradient" >&nbsp;</h6>
                    <br/><br/>
                </li>
                ))}
                <br/><br/><br/>
                
            </ul>

            
            </div>
        </>
    );

}
export default PastOrders;