import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import Center from "./Center";
import { Navigate } from 'react-router-dom';

const Register = ({ tokenStorage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error('Podane hasła nie są identyczne');
        return;
      }

      const response = await fetch('http://localhost:5000/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword, nationality }),
      });

      if (response.ok) {
        const token = await response.text();
        tokenStorage.setJWTToken(token);
        setRedirectToHome(true);
      } else {
        console.error('Błąd rejestracji');
      }
    } catch (error) {
      console.error('Wystąpił błąd', error);
    }
  };
  if (redirectToHome) {
    return <Navigate to="/login" />;
  }

  return (
      <Center>
        <Card sx={{width : "30" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{my: 3}}>
            Rejestracja
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
      <TextField
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="Nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />
      <Button variant="contained"
          size="large"
          sx={{width: "20%"}} 
          onClick={handleRegister}
          >
            Zarejestruj się
            </Button>
    </Box>
    </CardContent>
        </Card>
      </Center>
  );
};

export default Register;
