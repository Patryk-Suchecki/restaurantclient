import './App.css';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

const TokenStorage = () => {
  const [token, setToken] = useState('');

  const setJWTToken = (newToken) => {
    setToken(newToken);
  };

  const clearJWTToken = () => {
    setToken('');
  };

  return {
    token,
    setJWTToken,
    clearJWTToken,
  };
};

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
        const token = await response.text(); // Odczytujemy token jako tekst
        tokenStorage.setJWTToken(token);

        // Dekodowanie tokena po ustawieniu
        const decoded = jwtDecode(token);
        console.log(decoded);
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

const App = () => {
  const tokenStorage = TokenStorage();

  return (
    <div>
      <h1>Logowanie</h1>
      <Login tokenStorage={tokenStorage} />
    </div>
  );
};

export default App;
