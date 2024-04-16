import React, { useState } from 'react';
import Center from './Center';
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { Navigate } from 'react-router-dom';

const Login = ({ tokenStorage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const token = await response.text();
          tokenStorage.setJWTToken(token);
          setRedirectToHome(true);
        } else {
          console.error('Błąd logowania');
        }
      } catch (error) {
        console.error('Wystąpił błąd', error);
      }
    };
    if (redirectToHome) {
      return <Navigate to="/" />;
    }
    return (
      <Center>
        <Card sx={{width : "30" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{my: 3}}>
            Logowanie
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
        <Button
          variant="contained"
          size="large"
          sx={{width: "30%"}}
         onClick={handleLogin}
         >
          Zaloguj się
          </Button>
          </Box>
        </CardContent>
        </Card>
      </Center>
    );
  };
  export default Login;