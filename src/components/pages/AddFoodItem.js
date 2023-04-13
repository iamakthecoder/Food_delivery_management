import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarR from '../NavbarR';

function AddFoodItem() {
    const [inputs, setInputs] = useState({});
    const [issuccess,setissuccess] = useState('');

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values , [name]:value}))
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const handleSuccess = (msg) => {
        setissuccess(msg)
        // console.log(msg)
        if(msg=='Success'){
          window.location.href = '/menu'
        }
        else{
            window.location.href = '/addFoodItem'
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(inputs)
        fetch('/addFoodItem' , {
          method:"POST",
          body:JSON.stringify(inputs),
        }).then(response => response.json())
          .then(message => (
              handleSuccess(message['message'])
          ))
    }

    return(
        <>
        <div className="AddFoodItem">
          <NavbarR/>
        <h1>Add Food Item</h1>
        <div className="regularform">
        <form onSubmit={handleSubmit} >
          <div className="form-body">
              <div className="form-input">
                  <input  type="test" id="name" name="name" className="form__input" placeholder="Dish Name" value={inputs.name} onChange={handleChange}/>
              </div>
              <br/>
              <div className="form-input">
                  <input className="form__input" type="number" name="price" id="price" placeholder="Price" min="0" step="1" value={inputs.price} onChange={handleChange}/>
              </div>
          </div>
          <br/><br/><br/>
          <div class="footer">
              <button type="submit" className="btn1">Add Food Item</button>
          </div>
        </form>
      </div>  
        <div>
            <h1>{issuccess}</h1>
        </div>
      </div>    
        </>
    );
}

export default AddFoodItem;