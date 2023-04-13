import React, { useState } from 'react';
import '../../App.css';
import Navbar from '../Navbar';


function SignUpDeliveryAgent() {

  const [inputs, setInputs] = useState({});
  const [issuccess,setissuccess] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values , [name]:value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(inputs)
    fetch('/deliveryAgentSignup' , {
      method:"POST",
      body:JSON.stringify(inputs),
    }).then(response => response.json())
      .then(message => (
          handleSuccess(message['message'])
      ))    
  }

  const handleSuccess = (msg) => {
    setissuccess(msg)
    if(msg=='Success'){
      window.location.href = '/deliveryAgentLogin'
    }
    else{

    }
  }

  // const handleSubmit
  return(
    <>
    <div className='SignUp' style={{height:'100vh'}}>
    <Navbar/>
          <form onSubmit={handleSubmit} className='signup-form'>
        <h1 className='header'>Sign Up Form</h1>
              <div className="Name">
                  <input className="form__input" type="text" id="name" name="name" placeholder="Name" required value={inputs.name || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="email">
                  <input  type="email" required id="email" name="email" className="form__input" placeholder="Email" value={inputs.email || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="gender">
                  <select id="gender" name="gender" required className="form__input" value={inputs.gender} onChange={handleChange}>
                    <option value="" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
              </div>
              <br/>
              <div className="mobile">
                  <input className="form__input" type="tel" required name="mobile" id="mobile" placeholder="Mobile Number" value={inputs.mobile || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="area">
                  <input  type="text" name="area" id="area" required className="form__input"placeholder="Area" value={inputs.area || ""} onChange={handleChange}/>
              </div>
              <br/>
              <div className="address">
                  <input className="form__input" type="text" required name="address"  id="address" placeholder="Address" value={inputs.address || ""} onChange={handleChange}/>
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

export default SignUpDeliveryAgent;