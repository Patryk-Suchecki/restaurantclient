import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateRestaurant = ({ tokenStorage }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    deliveryDistance: '',
    contactEmail: '',
    contactNumber: '',
    city: '',
    street: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStorage.token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Restaurant created successfully');
        navigate(-1);
      } else {
        console.error('Failed to create restaurant');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h3" gutterBottom sx={{marginTop: 3}}>Dodaj restaurację</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          name="deliveryDistance"
          label="Delivery Distance"
          value={formData.deliveryDistance}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="email"
          name="contactEmail"
          label="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="tel"
          name="contactNumber"
          label="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="street"
          label="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          name="postalCode"
          label="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button type="submit" variant="contained" color="primary" size='large'>Dodaj</Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateRestaurant;