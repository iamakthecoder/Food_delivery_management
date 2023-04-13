import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import NavbarA from '../NavbarA';

function MenuAdmin(){
    const id = useParams()
    // console.log(id["id"])

    const [menu,setmenu] = useState([]);
    const [issuccess,setissuccess] = useState('');
    
    // console.log(id)

    
    useEffect(() => {fetch('/displayFoodItems/:id' , {
        method:"POST",
        body:JSON.stringify(id),
      }).then(response => response.json())
        .then(message => (
            // console.log(message["menu"]),
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
            window.location.href = '/allRestaurantAdmin'
          }
          else{
      
          }
        }
        function handleChangeClick(menuURL,menu) {
            window.location.href = "/changeRecommendFoodItem/".concat(menuURL).concat('/').concat(menu)
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
      <NavbarA/>
      <h1>Menu</h1>

      <table className='my-table'>

      </table>

      
      <table className='my-table' style={{height:'30vh',width:'40%'}}>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Price per Item</th>
            <th>Is Recommended</th>
            <th>
                Change 
            </th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
                      <tr>
                      <td>{item['name']}</td>
                      <td>{item['pricePerItem']}</td>
                      <td>
                        {String(item['isRecommended'])}
                      </td>
                      <td><button class="btn1" onClick={() => handleChangeClick(id["id"],item['foodItemId'])}>Change</button></td>
                      {/* <td>{ <input type="checkbox" name={item['name']} defaultValue="0" value={inputs.value}  min="0" onChange={handleChange}/>}</td> */}
                    </tr>
          ))}
        </tbody>
      </table>

      <div class="footer">
              <button type="submit" className="btn1" onClick={handleSubmit} style={{width:'15%'}}>See All Restaurants</button>
          </div>
    </div>
</>
    );
}

export default MenuAdmin;