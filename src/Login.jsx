import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Login = ({ tokenStorage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
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
        } else {
          console.error('Błąd logowania');
        }
      } catch (error) {
        console.error('Wystąpił błąd', error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  export default Login;