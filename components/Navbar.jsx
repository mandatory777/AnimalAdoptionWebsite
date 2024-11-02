import React from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="nav-link">🏡 Home</Link>
            <Link to="/add-animal" className="nav-link">🐾 Add Animal</Link>
            <Link to="/animal-listings" className="nav-link">🐶 View Listings</Link>
            <Link to="/admin-delete" className="nav-link">🧹 Delete All</Link>
        </div>
    );
};

export default Navbar;
