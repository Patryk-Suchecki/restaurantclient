import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userEmail, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Strona główna</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>{userEmail}</li>
            <li>
              <button onClick={onLogout}>Wyloguj</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
