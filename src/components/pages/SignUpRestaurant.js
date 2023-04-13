import React, { useState } from 'react';
import '../../App.css';
import Navbar from '../Navbar';

function SignUpRestaurant() {

  const [inputs, setInputs] = useState({});
  const [issuccess,setissuccess] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values , [name]:value}))
  }

  const handleSuccess = (msg) => {
    setissuccess(msg)
    if(msg=='Success'){
      window.location.href = '/restaurantLogin'
    }
    else{

    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(inputs)
    fetch('/restaurantSignup' , {
      method:"POST",
      body:JSON.stringify(inputs),
    }).then(response => response.json())
      .then(message => (
          handleSuccess(message['message'])
      ))    
  }

  // const handleSubmit
  return(
    <>
    <div className='SignUp' style={{height:'100vh'}}>
      <Navbar/>
          <form onSubmit={handleSubmit} className='signup-form'>
        <h1 className='header'>Sign Up</h1>
              <div className="Name">
                  <input className="form__input" type="text" id="name" name="name" placeholder="Name" required value={inputs.name || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="email">
                  <input  type="email" required id="email" name="email" className="form__input" placeholder="Email" value={inputs.email || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="area">
                  <input  type="text" name="area" id="area" required className="form__input"placeholder="Area" value={inputs.area || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="password">
                  <input className="form__input" name="password" type="password" required id="password" placeholder="Password" value={inputs.password} onChange={handleChange}/>
              </div>
              <br/>
              <div className="confirm-password">
                  <input className="form__input" name="confirmpassword" type="password" required id="confirm-password" placeholder="Confirm Password" value={inputs.confirmpassword} onChange={handleChange}/>
              </div>
          <div class="footer">
              <button type="submit" className="btnsignup">Register</button>
          </div>
          </form>
          <div>
            <h1>{issuccess}</h1>
          </div>
      </div>
    </>
  );
}

export default SignUpRestaurant;