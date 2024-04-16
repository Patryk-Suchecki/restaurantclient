import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DishList from './DishList';
import { Typography, Box, Paper } from '@mui/material';

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
    <Box sx={{ m: 2 }}>
      <Typography variant="h2" gutterBottom>{restaurant.name}</Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1" gutterBottom sx={{marginBottom: 3}}>{restaurant.description}</Typography>
        <Typography variant="body1" gutterBottom><i>Kategoria:</i> {restaurant.category}</Typography>
        <Typography variant="body1" gutterBottom><i>Odległość dostawy:</i> {restaurant.deliveryDistance} km</Typography>
        <Typography variant="body1" gutterBottom><i>Adres:</i> {restaurant.street}, {restaurant.postalCode} {restaurant.city}</Typography>
      </Paper>
      <DishList restaurantId={restaurantId} />
    </Box>
  );
};

export default RestaurantDetails;