// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If there's no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the children components
    return children;
};

export default ProtectedRoute;
