import React,{useState,useEffect} from 'react';
import '../../App.css';
import NavbarA from '../NavbarA'

export default function AllRestaurantAdmin() {

  const [restaurants,setrestaurants] = useState([]);
  const [restid,setrestid]=useState('')

    // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);


    useEffect(() => {fetch('/allRestaurant' , {
        method:"GET",
      }).then(response => response.json())
        .then(message => (
            // console.log(message),
            setrestaurants(message['restaurantList'])
        ))},[])

        function handleButtonClick(menuURL) {
          window.location.href = "/menuAdmin/".concat(menuURL)
        }
        function handleDeleteClick(menuURL,menu) {
            window.location.href = "/delete/".concat(menuURL).concat(menu)
        }
        function handleChangeClick(menuURL) {
            window.location.href = "/changeRecommendRestaurant/".concat(menuURL)
        }
  return (
    <>
    <div className="AllRestaurantAdmin">
    <NavbarA></NavbarA>
      <h1>Restaurants</h1><br/><br/><br/>

      <table className='my-table' style={{width:'60%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Restaurant Rating</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;Menu&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>Remove Restaurant</th>
            <th>Is Recommended</th>
            <th>Change Recommendation</th>
          </tr>
        </thead>
        <tbody>
        {restaurants.map((restaurant) => (
          <tr>
            <td>{restaurant['name']}</td>
            <td>{restaurant['ratingValue']}</td>
            <td><button onClick={() => handleButtonClick(restaurant['restaurantId'])}className='btn1'>Menu</button></td>
            <td><button onClick={() => handleDeleteClick("restaurant/",restaurant["restaurantId"])}className='btn1'>Delete</button></td>
            <td>{String(restaurant['isRecommended'])}</td>
            <td><button onClick={() => handleChangeClick(restaurant['restaurantId'])}className='btn1'>Change</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>

        
    </>
  )
}