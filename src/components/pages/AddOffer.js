import React, {useState, useEffect} from 'react';
import '../../App.css';
import NavbarA from '../NavbarA';

export default function AddOffer(){
    const [orders,setorders] = useState([]);
    const [inputs, setInputs] = useState({});
    const [issuccess,setissuccess] = useState('');

    const handlemessage = (msg) => {
        setorders(msg)
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values , [name]:value}))
      }
  
      const handleSuccess = (msg) => {
          setissuccess(msg)
          if(msg=='Success'){
            window.location.href = '/createOffer'
          }
          else{
              window.location.reload()
            //   console.log()
          }
        }
  
      const handleSubmit = (event) => {
          event.preventDefault()
          
          console.log(inputs)
  
          fetch('/addOffer' , {
            method:"POST",
            body:JSON.stringify(inputs),
          }).then(response => response.json())
            .then(message => (
              handleSuccess(message['message'])
                ))
                
      }

    
    // useEffect(() => {fetch('/' , {
    //     method:"GET",
    //   }).then(response => response.json())
    //     .then(message => (
    //         // console.log(message["user"])
    //         handlemessage(message['recentOrderList'])
    //     ))},[])
    
        // function handleButtonClick(menuURL) {
        //     window.location.href = "/moreDetailsOrder/".concat(menuURL)
        //   }
    
    return(
        <>
        <div className="AddOffer">
        <NavbarA/>

            <form onSubmit={handleSubmit} className="regularform" style={{height:'60%'}}>
            <h1>Create Offer</h1><br/><br/><br/>
            <div className="form-body">
                <div className="Location">
                    <input  type="text" min="0" id="Location" name="name" className="form__input" placeholder="Name" value={inputs.name} onChange={handleChange}/>
                </div><br/>
                <br/>
                <div className="Location">
                    <input  type="number" min="0" id="Location" name="discount" className="form__input" placeholder="Discount" value={inputs.discount} onChange={handleChange}/>
                </div><br/>
                <br/>
                <div className="Location">
                    <input  type="number" min="0" id="Location" name="upperLimit" className="form__input" placeholder="upperLimit" value={inputs.upperLimit} onChange={handleChange}/>
                </div><br/>
                <br/>
                
            </div>
            <div class="footer">
                <button type="submit" className="btn1">Submit</button>
            </div>
            </form>
            </div>
        </>
    )

}

