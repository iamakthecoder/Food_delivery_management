import React,{useState,useEffect} from 'react';
import '../../App.css';
import NavbarC from '../NavbarC'

export default function AllRestaurants() {

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
          window.location.href = "/displayFoodItems/".concat(menuURL)
        }
  return (
    <div className="AllRestaurants">
    <NavbarC></NavbarC>
      <h1>Restaurants</h1>
      <table className='my-table'>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Restaurant Rating</th>
            <th>Restaurant Menu</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
                      <tr>
                      <td>{restaurant['name']}</td>
                      <td>{restaurant['ratingValue']}</td>
                      <td><button onClick={() => handleButtonClick(restaurant['restaurantId'])} className="btn1">Menu</button></td>
                    </tr>
          ))}

        </tbody>
      </table>
    </div>

  )
}