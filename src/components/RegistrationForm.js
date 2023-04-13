// import React, {useState} from 'react';
// import './FormStyle.css'

// export const RegistrationForm = ({userInput , onFormChange}) => {

//     const handleChange = (event) =>{
//         const name = events.target.name
//         onFormChange(event.target.value)
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//     }
//     return(
//       <div className="form">
//         <h1>Sign Up Form</h1>
//           <form onSubmit={handleSubmit}>
//               <div className="Name">
//                   <input className="form__input" type="text" id="name" placeholder="Name" required value={userInput} onChange={handleChange}/>
//               </div>
//               <br/>
//               <div className="email">
//                   <input  type="email" id="email" className="form__input" placeholder="Email"/>
//               </div>
//               <br/>
//               <div className="gender">
//                   <select id="gender" className="form__input">
//                     <option value="" disabled selected hidden>Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//               </div>
//               <br/>
//               <div className="mobile">
//                   <input className="form__input" type="tel" id="mobile" placeholder="Mobile Number"/>
//               </div>
//               <br/>
//               <div className="area">
//                   <input  type="text" name="" id="area"  className="form__input"placeholder="Area"/>
//               </div>
//               <br/>
//               <div className="address">
//                   <input className="form__input" type="text"  id="address" placeholder="Address"/>
//               </div>
//               <br/>
//               <div className="password">
//                   <input className="form__input" type="password" id="confirmPassword" placeholder="Password"/>
//               </div>
//               <br/>
//               <div className="confirm-password">
//                   <input className="form__input" type="password" id="confirm-password" placeholder="Confirm Password"/>
//               </div>
//           </form>
//           <div class="footer">
//             <a href="/customerLogin">
//               <button type="submit" className="btn1">Register</button>
//             </a>
//           </div>
//       </div>      
//     )       
// }
