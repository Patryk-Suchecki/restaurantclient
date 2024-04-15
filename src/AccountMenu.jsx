import React, { useState } from 'react';

const AccountMenu = ({ isAuthenticated, isAdmin, onLogin, onRegister, onAdminPanel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleAdminClick = () => {
        onAdminPanel();
        setIsOpen(false);
    };

    const renderMenuOptions = () => {
        if (isAuthenticated) {
            return (
                <ul>
                    <li onClick={handleAdminClick}>Admin Panel</li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li onClick={onLogin}>Zaloguj</li>
                    <li onClick={onRegister}>Zarejestruj</li>
                </ul>
            );
        }
    };

    return (
        <div className="account-menu">
            <div className="account-menu-toggle" onClick={toggleMenu}>
                Konto
            </div>
            {isOpen && (
                <div className="account-menu-options">
                    {renderMenuOptions()}
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
