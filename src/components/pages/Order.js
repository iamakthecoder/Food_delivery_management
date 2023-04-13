import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import NavbarC from '../NavbarC'

function Order(){
    const id = useParams()

    const [menu,setmenu] = useState([]);
    const [issuccess,setissuccess] = useState('');
    
    // console.log(id)

    
    useEffect(() => {fetch('/displayFoodItems/:id' , {
        method:"POST",
        body:JSON.stringify(id),
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            setmenu(message["menu"])
        ))},[])


        const [inputs, setInputs] = useState({});
        // const [issuccess,setissuccess] = useState('');
      
        const handleChange = (event) => {
          const name = event.target.name;
          const value = event.target.value;
          setInputs(values => ({...values , [name]:value}))
        }
      
        const handleSuccess = (msg) => {
          setissuccess(msg)
          if(msg=='Success'){
            // console.log("Hello World")
            window.location.href = '/orderDetails'
          }
          else{
      
          }
        }
      
        const handleSubmit = (event) => {
          event.preventDefault()
          // console.log(inputs)
          fetch('/order' , {
            method:"POST",
            body:JSON.stringify(inputs),
          }).then(response => response.json())
            .then(message => (
              // console.log(message),
                handleSuccess(message['message'])
            ))    
        }

    return (
<>
    <div className="Order">
      <NavbarC/>
      <h1>Menu</h1>

      <table className='my-table'>

      </table>

      
      <table className='my-table' style={{height:'30vh',width:'40%'}}>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Price per Item</th>
            <th>Enter Quantity</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
                      <tr>
                      <td>{item['name']}</td>
                      <td>{item['pricePerItem']}</td>
                      <td>{ <input type="number" name={item['name']} defaultValue="0" value={inputs.quantity}  min="0" onChange={handleChange}/>}</td>
                    </tr>
          ))}
        </tbody>
      </table>

      <div class="footer">
              <button type="submit" className="btn1" onClick={handleSubmit} style={{width:'15%'}}>Place Order</button>
          </div>
      {/* </form> */}
      <h1>
        {issuccess}
      </h1>
    </div>
</>
    );
}

export default Order;