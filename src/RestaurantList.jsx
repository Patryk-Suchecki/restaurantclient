import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Divider, Card } from '@mui/material';

const RestaurantList = ({ restaurants }) => {
  return (
    <Card>
      <List>
        {restaurants.items.map((restaurant) => (
          <React.Fragment key={restaurant.id}>
            <ListItem component={Link} to={`/restaurant/${restaurant.id}`}>
              <ListItemText primary={restaurant.name} secondary={`Category: ${restaurant.category}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

export default RestaurantList;