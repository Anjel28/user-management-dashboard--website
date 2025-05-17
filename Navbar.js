import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">User Dashboard Management</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Profile</Link>
        <Link to="/add" className="nav-link">Add user mangement</Link>
      </div>
    </nav>
  );
};

export default Navbar;