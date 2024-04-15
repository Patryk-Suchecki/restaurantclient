import React, { useState } from 'react';
import './App.css';
import TokenStorage from './TokenStorage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import SendRequest from './SendRequest';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import CreateRestaurant from './CreateRestaurant';
import RestaurantListByOwner from './RestaurantListByOwner';

const App = () => {
  const tokenStorage = TokenStorage();
  const isAuthenticated = !!tokenStorage.token;
  const [restaurantData, setRestaurantData] = useState(null);

  const handleRestaurantData = (data) => {
    setRestaurantData(data);
  };

  const handleLogout = () => {
    tokenStorage.clearJWTToken();
  };

  const updateRestaurantData = (data) => {
    setRestaurantData(data);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} userEmail={tokenStorage.token} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" 
            element={
              <>
                <SendRequest onRestaurantData={handleRestaurantData} />  
                {restaurantData != null && <RestaurantList restaurants={restaurantData} />}
                <Link to="/restaurant">Stwórz restauracje</Link>
              </>
            }
          />
          <Route path="/login" element={<Login tokenStorage={tokenStorage} />} />
          <Route path="/register" element={<Register tokenStorage={tokenStorage} />} />
          <Route path="/restaurant/" element={<CreateRestaurant tokenStorage={tokenStorage} />} />
          <Route path="/own/" element={<RestaurantListByOwner tokenStorage={tokenStorage} />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
