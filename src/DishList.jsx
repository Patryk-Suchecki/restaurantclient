import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const DishList = ({ restaurantId }) => {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`);
        if (response.ok) {
          const data = await response.json();
          setDishes(data);
        } else {
          console.error('Błąd podczas pobierania danych o daniach');
        }
      } catch (error) {
        console.error('Wystąpił błąd', error);
      }
    };

    fetchDishes();
  }, [restaurantId]);

  if (!dishes) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Menu</Typography>
      <List>
        {dishes.map((dish, index) => (
          <React.Fragment key={dish.id}>
            <ListItem>
              <ListItemText
                primary={dish.name}
                secondary={
                  <>
                  <Typography variant="body1" component="span" sx={{marginRight: 3}}>Cena: {dish.price}</Typography>
                    <Typography variant="body1" component="span">Opis: {dish.description}</Typography>
                    
                  </>
                }
              />
            </ListItem>
            {index !== dishes.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default DishList;