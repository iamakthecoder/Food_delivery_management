import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarC from '../NavbarC';



function PromoCode(props){
  const offerList=props.vari;



  const handleSuccess = (msg) => {
    if(msg == "Success"){
      window.location.href='/orderDetails'
    }
    else{
      window.location.href='/allRestaurants'
    }
  }

  const handleClick = (event,params) => {
    fetch('/addOfferCustomer/'.concat(params) , {
      method:"GET",
    }).then(response => response.json())
      .then(message => (
          handleSuccess(message["message"])
      )) 
  }

  return (
    <table className='my-table' style={{width:'40%'}}>
    <thead>
        <tr>
            <th>Name</th>
            <th>Discount %</th>
            <th>Upper Limit</th>
            <th>Choose</th>
        </tr>
    </thead>
    <tbody>
    {offerList.map((item) => (
        <tr>
            <td>{item["name"]}</td>
            <td>{item["discount"]}</td>
            <td>{item["upperLimit"]}</td>
            <td><button type="submit" className="btn1" onClick={event => handleClick(event , item['customer_offerId'])} style={{width:'50%'}}>Choose Offer</button></td>
        </tr>
    ))}
    </tbody>
  </table>
  
  );

  
}

function ConfirmOrder() {

    const [details, setdetails] = useState({});
    const [issuccess,setissuccess] = useState("");
    const [orderList,setorderList] = useState([]);
    const [offerList,setofferList] = useState([]);

    // const handleChange = (event) => {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   setInputs(values => ({...values , [name]:value}))
    // }

    const handleSuccess = (msg) => {
        setissuccess(msg)
        if(msg=="Success"){
          window.location.href = '/customerDashboard'
        }
        else{

        }
      }

    const handleSubmit = (event) => {
        fetch('/placeOrder' , {
          method:"GET",
        }).then(response => response.json())
          .then(message => (
              handleSuccess(message["message"])
          ))
    }


      useEffect(() => {
    fetch('/orderDetails').then(
      response => response.json()
    ).then(message => (
      console.log(message),
      setdetails(message),
      setorderList(message['orderList']),
      setofferList(message['offerList'])
    ))
  }, []);

  // useEffect(() => {
  //   fetch('/offerListCustomer')
  // },[])

  let message;
  let message2;

  if(offerList.length == 0){
    message=<h1>No Promotional Offers Available</h1>
    message2=<p>None</p>
  }
  else if(details['offerUsed'] === null){
    message=<PromoCode vari={details['offerList']}/>
    message2=<>None</>
  }
  else{
    message=<PromoCode vari={details['offerList']}/>
    message2=<>{details['offerUsed']['name']}</>
  }

    return(
        <>
        <div className="ConfirmOrder">
        <NavbarC/>


        <h1>Order Details</h1>

        <table className='my-table' style={{width:'35%'}}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>{details['customerName']}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Restaurant Name</td>
              <td>{details['restaurantName']}</td>
            </tr>
            <tr>
              <td>Base Price</td>
              <td>{details['cost']}</td>
            </tr>
            <tr>
              <td>Delivery Charge</td>
              <td>{details['deliveryCharge']}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{details['discount']}</td>
            </tr>
            <tr>
              <td>Total amount to pay</td>
              <td>{details['final']}</td>
            </tr>
            <tr>
              <td>Offer Used</td>
              <td>{message2}</td>
            </tr>
          </tbody>
          
          
        </table>

        <br/><br/><br/><br/><br/><br/>
        <h2>Order List</h2>

        <table className='my-table'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price per Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>

            {orderList.map((m) => (
            <tr>
              <td>{m['name']}</td>
              <td>{m['pricePerItem']}</td>
              <td>{m['frequency']}</td>
            </tr>
            ))}
          </tbody>
        </table>

<br/><br/><br/><br/>
          <div>
            {message}
          </div>
          <br/><br/>
          <div class="footer">
              <button type="submit" className="btn1" onClick={handleSubmit} style={{width:'10%'}}>Confirm and Pay</button>
          </div>






      </div>    
        </>
    );
}

export default ConfirmOrder;