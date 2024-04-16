import React, { useState } from 'react';
import { Card, Box, Pagination, CardContent, TextField, Button, Typography, Select, MenuItem, CircularProgress } from '@mui/material';
import Center from './Center';
import RestaurantList from './RestaurantList';

const SendRequest = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortDirection, setSortDirection] = useState('DESC');
  const [city, setCity] = useState('Katowice');
  const [street, setStreet] = useState('Mikołowska 1');
  const [house, setHouse] = useState('10');
  const [postalCode, setPostalCode] = useState('40-800');
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(false); // Dodajemy stan loading

  const handleSendRequest = async () => {
    setRestaurantData(null);
    setLoading(true); // Ustawiamy stan loading na true
    try {
      const requestData = {
        PageSize: pageSize,
        PageNumber: pageNumber,
        sortDirection: sortDirection,
        adressDto: {
          City: city,
          Street: street,
          House: house,
          Apartment: 1,
          PostalCode: postalCode
        }
      };

      const response = await fetch('http://localhost:5000/api/restaurant/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurantData(data);
      } else {
        console.error('Błąd podczas wysyłania żądania');
      }
    } catch (error) {
      console.error('Wystąpił błąd', error);
    } finally {
      setLoading(false); // Ustawiamy stan loading z powrotem na false, gdy żądanie zostało zakończone
    }
  };

  const handleLocationClick = () => {
    setCity('Chorzów');
    setStreet('Opolska');
    setHouse('19');
    setPostalCode('41-500');
  };
  const handlePageChange = (value) => {
    setPageNumber(value);
    handleSendRequest();
  };
  return (
    <Box>
      <Typography variant='h4' sx={{textAlign: "center", marginTop: 3}}>Znajdź restuaracje w pobliżu</Typography>
      <Card sx={{ marginX: "15%"}}>    
      <CardContent sx={{ textAlign: "center" }}>      
      <TextField
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="House"
        value={house}
        onChange={(e) => setHouse(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="PostalCode"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        sx={{marginRight: 10}}
      />

            <Select type="text"
        placeholder="Sort Direction"
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}>
          <MenuItem value="DESC">Alfabetycznie malejąco</MenuItem>
          <MenuItem value="ASC">Alfabetycznie rosnąco</MenuItem>
      </Select>
      <Select
        type="number"
        placeholder="PageSize"
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
      </Select>
      
      </CardContent>
      <CardContent sx={{ textAlign: "center" }}>
      <Button variant="outlined" onClick={handleLocationClick}>Pobierz lokalizację</Button>
      </CardContent>
      <CardContent sx={{ textAlign: "center" }}>
      <Button variant="contained" onClick={handleSendRequest}>Wyszukaj</Button>
      </CardContent>
      </Card>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        restaurantData != null && <RestaurantList restaurants={restaurantData} />
      )}
      <Pagination count={restaurantData  != null ? (restaurantData.totalPages) : (1) } variant='outlined' onChange={handlePageChange}/>
      
    </Box>
  );
};

export default SendRequest;
