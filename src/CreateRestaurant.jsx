import React, { useState } from 'react';

const CreateRestaurant = ({ tokenStorage }) => {
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
      } else {
        console.error('Failed to create restaurant');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="deliveryDistance" placeholder="Delivery Distance" value={formData.deliveryDistance} onChange={handleChange} required />
        <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />
        <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
