import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarR from '../NavbarR'

function PastOrderRestaurant(){
    const [orders,setorders] = useState([]);

    const handlemessage = (msg) => {
    setorders(msg)
    }


    useEffect(() => {fetch('/pastOrder' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message["user"])
            handlemessage(message["pastOrderlist"])
        ))},[])

    return(
        <>
            <div className="PastOrdersRestaurant">
                <NavbarR/>
            <h1>Order Details</h1>
            <br/><br/><br/>
            <ul>
                {orders.map((pastOrder) => (
                    <li key={['pastOrderlist']}>
                    <ul>

                        <h3>
                        OrderId: {pastOrder["orderId"]}&nbsp;&nbsp;
                        Date&time: {pastOrder["orderDateTime"]}
                        </h3>

                        <table className='my-table'>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price Per Item</th>
                                </tr>
                            </thead>

                            <tbody>
                            {pastOrder.orderList.map((item) => (
                                <tr>
                                    <td>{item["name"]}</td>
                                    <td>{item["frequency"]}</td>
                                    <td>{item["pricePerItem"]}</td> 
                                </tr>                       
                    ))}
                            </tbody>
                        </table><br/><br/>

                        <h3>

                        Discount: {pastOrder["dicountValue"]}&nbsp;
                        Delivery Charge: {pastOrder["deliveryCharge"]}&nbsp;
                        Total : {pastOrder["orderValue"]}</h3>

                    </ul>
                <br/><br/>
                <h6 className="gradient1" >&nbsp;</h6>
                    <br/><br/>
                </li>
                ))}
                <br/><br/><br/>
            </ul>
            </div>
        </>
    );

}
export default PastOrderRestaurant;