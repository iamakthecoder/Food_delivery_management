import React from 'react'
import { useState, useEffect } from 'react';
import NavbarA from '../NavbarA';

export default function AdminDashboard(){




  const handleCustomersClick = () => {
    window.location.href='/allCustomers';
  };

  const handleRestaurantsClick = () => {
    window.location.href='/allRestaurantAdmin';
  };

  const handleAgentsClick = () => {
    window.location.href='/allDeliveryAgents';
  };

  const handleOffersClick = () => {
    window.location.href='/createOffer';
  };

    return (
      <div className="AdminDashboard">
          <NavbarA/>
          <h1>Welcome to the Admin Dashboard</h1><br/><br/><br/><br/>
          <button onClick={handleCustomersClick} className="addashbuttons">List of Customers</button><br/>
          <button onClick={handleRestaurantsClick} className="addashbuttons">List of Restaurants</button><br/>
          <button onClick={handleAgentsClick} className="addashbuttons">List of Delivery Agents</button><br/>
          <button onClick={handleOffersClick} className="addashbuttons">Promotional Offers</button>
        </div>
      );

}