
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './Auth.routes.css';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import EmailVerifyPage from './EmailVerify/EmailVerifyPage';
import { useLocation } from 'react-router';
import logo from 'assets/ping.Me Logo NEW 3.png';

const AuthRoutes : React.FC<{ isAuthenticated? : boolean }> = ({isAuthenticated , ...props}) => {
    const location = useLocation();
    useEffect(() => {
        console.dir(location);
    }, []);
    return (
        <div className='auth-page-container'>
            <div className='auth-page-app-branding-container'>
                <div className='app-branding-image-div'>
                    <img src={logo}></img>
                </div>
                <div className='app-branding-main-header'>
                    <h1>Ping.Me</h1>
                </div>
                <div className='app-branding-sub-header'>
                    <h1>Chat with Anyone, Anywhere, and Anytime</h1>
                </div>
            </div>
            <div className='auth-form-container'>
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/email-verify/:tokenStringEncrypted" element={<EmailVerifyPage></EmailVerifyPage>}></Route>
                <Route path="/" element={<Navigate to="/auth/login"></Navigate>}></Route>
            </Routes>
            </div>
        </div>
    )
}

export default AuthRoutes;
