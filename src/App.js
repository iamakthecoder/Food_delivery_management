import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import AboutUs from './components/pages/AboutUs';
import SignUpRestaurant from './components/pages/SignUpRestaurant';
import LoginRestaurant from './components/pages/LoginRestaurant';
import SignUpDeliveryPartner from './components/pages/SignUpDeliveryPartner';
import LoginDeliveryPartner from './components/pages/LoginDeliveryPartner';
import CustomerDashboard from './components/pages/CustomerDashboard';
import RestaurantDashboard from './components/pages/RestaurantDashboard';
import Menu from './components/pages/Menu';
import AddFoodMenu from './components/pages/AddFoodItem';
import DeliveryAgentDashboard from './components/pages/DeliveryAgentDashboard'
import PersonalDataDeliveryAgent from './components/pages/PersonalDataDeliveryAgent'
import PersonalDataRestaurant from './components/pages/PersonalDataRestaurant'
import PersonalData from './components/pages/PersonalData'
import AllRestaurants from './components/pages/AllRestaurants'
import Order from './components/pages/Order'
import ConfirmOrder from './components/pages/ConfirmOrder'
import PastOrders from './components/pages/PastOrders'
import RecentOrderCustomer from './components/pages/RecentOrderCustomer'
import MoreDetailsOrder from './components/pages/MoreDetailsOrder'
import SeeDeliveryRequest from './components/pages/SeeDeliveryRequest'
import PendingOrderRestaurant from './components/pages/PendingOrderRestaurant'
import OrderDetailsRestaurant from './components/pages/OrderDetailsRestaurant'
import GiveEstimatedTime from './components/pages/GiveEstimatedTime'
import SendDeliveryRequest from './components/pages/SendDeliveryRequest'
import AcceptDeliveryRequest from './components/pages/AcceptDeliveryRequest'
import MoreDetailsDeliveryRequest from './components/pages/MoreDetailsDeliveryRequest'
import RatingDeliveryAgent from './components/pages/RatingDeliveryAgent'
import MarkLocation from './components/pages/MarkLocation'
import PastOrderRestaurant from './components/pages/PastOrderRestaurant'
import AdminDashboard from './components/pages/AdminDashboard'
import AllCustomers from './components/pages/AllCustomers'
import AllDeliveryAgents from './components/pages/AllDeliveryAgents'
import AllRestaurantAdmin from './components/pages/AllRestaurantAdmin'
import DeleteUser from './components/pages/DeleteUser'
import ManagementLogin from './components/pages/ManagementLogin'
import ChangeRecommendRestaurant from './components/pages/ChangeRecommendRestaurant'
import CreateOffer from './components/pages/CreateOffer'
import AddOffer from './components/pages/AddOffer'
import MenuAdmin from './components/pages/MenuAdmin';
import ChangeRecommendFoodItem from './components/pages/ChangeRecommendFoodItem';
import AllOffer from './components/pages/AllOffer';
import GiveOffer from './components/pages/GiveOffer';
import RecommendedRestaurant from './components/pages/RecommendedRestaurant'
import RateRestaurant from './components/pages/RateRestaurant';

function App() {
  // const [initialData, setInitialData] = useState([{}])

  // useEffect(() => {
  //   fetch('/').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);



  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/about-us' element={<AboutUs/>} />
          <Route exact path='/customerLogin' element={<Login/>} />
          <Route exact path='/customerSignup' element={<SignUp/>} />
          <Route exact path='/restaurantSignup' element={<SignUpRestaurant/>} />
          <Route exact path='/restaurantLogin' element={<LoginRestaurant/>} />
          <Route exact path='/deliveryAgentSignup' element={<SignUpDeliveryPartner/>} />
          <Route exact path='/deliveryAgentLogin' element={<LoginDeliveryPartner/>} />
          <Route exact path='/customerDashboard' element={<CustomerDashboard/>} />
          <Route exact path='/restaurantDashboard' element={<RestaurantDashboard/>} />
          <Route exact path='/menu' element={<Menu/>} />
          <Route exact path='/addFoodItem' element={<AddFoodMenu/>} />
          <Route exact path='/deliveryAgentDashboard' element={<DeliveryAgentDashboard/>} />
          <Route exact path='/personalDataAgent' element={<PersonalDataDeliveryAgent/>} />
          <Route exact path='/personalData' element={<PersonalData/>} />
          <Route exact path='/personalDataRestaurant' element={<PersonalDataRestaurant/>} />
          <Route exact path='/allRestaurants' element={<AllRestaurants/>} />
          <Route exact path='/displayFoodItems/:id' element={<Order/>} />
          <Route exact path='/moreDetailsOrder/:id' element={<MoreDetailsOrder/>} />
          <Route exact path='/pastOrders' element={<PastOrders/>} />
          <Route exact path='/presentOrders' element={<RecentOrderCustomer/>} />
          <Route exact path='/orderDetails' element={<ConfirmOrder/>} />
          <Route exact path='/seeDeliveryRequest' element={<SeeDeliveryRequest/>} />
          <Route exact path='/acceptDeliveryRequest/:id' element={<AcceptDeliveryRequest/>} />
          <Route exact path='/moreDetailsDeliveryRequest/:id' element={<MoreDetailsDeliveryRequest/>} />
          <Route exact path='/ratingDeliveryAgent/:id' element={<RatingDeliveryAgent/>} />
          <Route exact path='/pendingOrdersRestaurant' element={<PendingOrderRestaurant/>} />
          <Route exact path='/orderDetailRestaurant/:id' element={<OrderDetailsRestaurant/>} />
          <Route exact path='/giveEstimatedTime/:id' element={<GiveEstimatedTime/>} />
          <Route exact path='/sendDeliveryRequest/:id' element={<SendDeliveryRequest/>} />
          <Route exact path='/markLocation' element={<MarkLocation/>} />
          <Route exact path='/PastOrderRestaurant' element={<PastOrderRestaurant/>} />
          <Route exact path='/adminDashboard' element={<AdminDashboard/>} />
          <Route exact path='/allCustomers' element={<AllCustomers/>} />
          <Route exact path='/allDeliveryAgents' element={<AllDeliveryAgents/>} />
          <Route exact path='/allRestaurantAdmin' element={<AllRestaurantAdmin/>} />
          <Route exact path='/delete/:userType/:id' element={<DeleteUser/>} />
          <Route exact path='/managementLogin' element={<ManagementLogin/>} />
          <Route exact path='/changeRecommendRestaurant/:id' element={<ChangeRecommendRestaurant/>} />
          <Route exact path='/createOffer' element={<CreateOffer/>} />
          <Route exact path='/addOffer' element={<AddOffer/>} />
          <Route exact path='/menuAdmin/:id' element={<MenuAdmin/>} />
          <Route exact path='/allOffer/:id' element={<AllOffer/>} />
          <Route exact path='/changeRecommendFoodItem/:rid/:fid' element={<ChangeRecommendFoodItem/>} />
          <Route exact path='/giveOffer/:cid/:oid' element={<GiveOffer/>} />
          <Route exact path='/recommendedRestaurant' element={<RecommendedRestaurant/>} />
          <Route exact path='/rateRestaurant/:id' element={<RateRestaurant/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;