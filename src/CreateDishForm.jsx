import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

const AddNewDishForm = () => {
  const { restaurantId } = useParams();
  console.log("restaurantId:", restaurantId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const addNewDish = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant/${restaurantId}/dish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
      });

      if (response.ok) {
        console.log('Pomyślnie dodano nowe danie');
        navigate(-1);
      } else {
        console.error('Błąd podczas dodawania nowego dania');
      }
    } catch (error) {
      console.error('Wystąpił błąd', error);
    }
  };

  return (
    <Card sx={{ width: "30%" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ my: 3 }}>
          Dodaj nowe danie
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": {
              margin: 2,
              width: "90%",
            },
          }}
        >
          <TextField
            name="name"
            label="Nazwa dania"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            name="description"
            label="Opis dania"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            name="price"
            label="Cena"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            onClick={addNewDish}
            sx={{ width: "30%", marginTop: 2 }}
          >
            Dodaj danie
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddNewDishForm;
