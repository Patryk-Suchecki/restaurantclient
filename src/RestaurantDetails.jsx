// RestaurantDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DishList from './DishList';

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        } else {
          console.error('Błąd podczas pobierania danych o restauracji');
        }
      } catch (error) {
        console.error('Wystąpił błąd', error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>Description: {restaurant.description}</p>
      <p>Category: {restaurant.category}</p>
      <p>Delivery Distance: {restaurant.deliveryDistance} km</p>
      <p>Address: {restaurant.street}, {restaurant.postalCode} {restaurant.city}</p>
      
      <DishList restaurantId={restaurantId} />
    </div>
  );
};

export default RestaurantDetails;
