import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light">
      <h1 className="mb-4">Welcome to Task Management App</h1>
      <div className="d-flex flex-column flex-sm-row">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-outline-primary mx-2">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
