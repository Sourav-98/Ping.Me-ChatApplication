
import React from 'react';

import { Routes, Route, Navigate } from 'react-router';

import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';

const AuthRoutes : React.FC<{ isAuthenticated : boolean }> = ({isAuthenticated , ...props}) => {
    return (
        <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage/> : <Navigate to="/"/>}></Route>
            <Route path="/register" element={!isAuthenticated ? <RegisterPage/> : <Navigate to="/"/>}></Route>
        </Routes>
    )
}

export default AuthRoutes;
