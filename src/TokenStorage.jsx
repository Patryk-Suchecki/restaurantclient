import React from 'react';

const TokenStorage = () => {
  const [token, setToken] = React.useState('');

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

export default TokenStorage;