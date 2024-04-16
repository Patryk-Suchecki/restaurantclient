import React from 'react';
import './App.css';
import TokenStorage from './TokenStorage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import SendRequest from './SendRequest';
import RestaurantDetails from './RestaurantDetails';
import CreateRestaurant from './CreateRestaurant';
import RestaurantListByOwner from './RestaurantListByOwner';
import AddNewDishForm from './CreateDishForm';

const App = () => {
  const tokenStorage = TokenStorage();
  const isAuthenticated = !!tokenStorage.token;

  const handleLogout = () => {
    tokenStorage.clearJWTToken();
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" element={<SendRequest />}/>
          <Route path="/login" element={<Login tokenStorage={tokenStorage} />} />
          <Route path="/register" element={<Register tokenStorage={tokenStorage} />} />
          <Route path="/restaurant/" element={<CreateRestaurant tokenStorage={tokenStorage} />} />
          <Route path="/own/" element={<RestaurantListByOwner tokenStorage={tokenStorage} />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
          <Route path="/restaurant/:restaurantId/dish" element={<AddNewDishForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
