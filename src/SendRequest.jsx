import React, { useState } from 'react';

const SendRequest = ({ onRestaurantData }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortDirection, setSortDirection] = useState('DESC');
  const [city, setCity] = useState('Katowice');
  const [street, setStreet] = useState('Mikołowska 1');
  const [house, setHouse] = useState('10');
  const [apartment, setApartment] = useState('1');
  const [postalCode, setPostalCode] = useState('40-800');

  const handleSendRequest = async () => {
    try {
      const requestData = {
        PageSize: pageSize,
        PageNumber: pageNumber,
        sortDirection: sortDirection,
        adressDto: {
          City: city,
          Street: street,
          House: house,
          Apartment: apartment,
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
        onRestaurantData(data); // Przekazujemy dane do komponentu nadrzędnego
      } else {
        console.error('Błąd podczas wysyłania żądania');
      }
    } catch (error) {
      console.error('Wystąpił błąd', error);
    }
  };

  const handleLocationClick = () => {
    setCity('Katowice');
    setStreet('Mikołowska 1');
    setHouse('10');
    setApartment('1');
    setPostalCode('40-800');
  };

  return (
    <div>
      <input
        type="number"
        placeholder="PageSize"
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
      />
      <input
        type="number"
        placeholder="PageNumber"
        value={pageNumber}
        onChange={(e) => setPageNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sort Direction"
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type="text"
        placeholder="House"
        value={house}
        onChange={(e) => setHouse(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apartment"
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
      />
      <input
        type="text"
        placeholder="PostalCode"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <button onClick={handleLocationClick}>Pobierz lokalizację</button>
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default SendRequest;
