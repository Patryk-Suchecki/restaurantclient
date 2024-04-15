import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantList = ({ restaurants }) => {
  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.items.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <h3>{restaurant.name}</h3>
            </Link>
            <p>Category: {restaurant.category}</p>
          </li>
        ))}
      </ul>
      <p>Total Pages: {restaurants.totalPages}</p>
      <p>Total Items Count: {restaurants.totalItemsCount}</p>
    </div>
  );
};

export default RestaurantList;