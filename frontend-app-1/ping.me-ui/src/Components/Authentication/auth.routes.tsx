
import React, { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router';

import AuthPageTemplate from './templates/AuthPage.template';

import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import EmailVerifyPage from './EmailVerify/EmailVerifyPage';
import { useLocation } from 'react-router';

const AuthRoutes : React.FC<{ isAuthenticated? : boolean }> = ({isAuthenticated , ...props}) => {
    const location = useLocation();
    useEffect(() => {
        console.dir(location);
    }, []);
    return (
        <AuthPageTemplate>
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/email-verify/:tokenStringEncrypted" element={<EmailVerifyPage></EmailVerifyPage>}></Route>
                <Route path="/" element={<Navigate to="/auth/login"></Navigate>}></Route>
            </Routes>
        </AuthPageTemplate>
    )
}

export default AuthRoutes;
