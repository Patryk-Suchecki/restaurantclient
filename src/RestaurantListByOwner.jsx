import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Divider, Typography } from '@mui/material';

const RestaurantListByOwner = ({ tokenStorage }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState({});

  useEffect(() => {
    const fetchRestaurantsByOwner = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/restaurant/own', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenStorage.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
          data.forEach(restaurant => {
            fetchDishes(restaurant.id);
          });
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsByOwner();
  }, [tokenStorage]);

  const fetchDishes = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: data
        }));
      } else {
        console.error(`Failed to fetch dishes for restaurant with id ${restaurantId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (restaurantId, id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        }
      });

      if (response.ok) {
        setDishes(prevState => ({
          ...prevState,
          [restaurantId]: prevState[restaurantId].filter(dish => dish.id !== id)
        }));
      } else {
        console.error(`Failed to delete dish with id ${id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h3">Twoje restauracje</Typography>
      <Divider />
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h4">{restaurant.name}</Typography>
            <Button onClick={() => handleDelete(restaurant.id)} variant="outlined" color="error">Usuń</Button>
            <ul>
              {dishes[restaurant.id]?.map((dish) => (
                <li key={dish.id}>
                  <Typography variant="h5">{dish.name}</Typography>
                  <Button onClick={() => handleDelete(restaurant.id, dish.id)}>Delete</Button>
                </li>
              ))}
            </ul>
              <Button sx={{marginTop: 1}}variant="contained" component={Link} to={`/restaurant/${restaurant.id}/dish`}>Dodaj danie</Button>
          </CardContent>
        </Card>
      ))}
      <Button variant="outlined"><Link to="/restaurant">Dodaj restaurację</Link></Button>
    </div>
  );
};

export default RestaurantListByOwner;