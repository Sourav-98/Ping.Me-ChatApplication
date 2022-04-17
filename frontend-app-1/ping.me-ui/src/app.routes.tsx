import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import AuthRoutes from 'Components/Authentication/Auth.routes';
import UserHomeRoutes from 'Components/UserHome/UserHome.routes';

const AppRoutes : React.FC<{isAuthenticated : boolean}> = function({isAuthenticated, ...props}){
    return(
        <Routes>
            <Route path="/auth/*" element={(!isAuthenticated) ? <AuthRoutes></AuthRoutes> : <Navigate to="/app"></Navigate>}></Route>
            <Route path="/app/*" element={(isAuthenticated) ? <UserHomeRoutes></UserHomeRoutes>: <Navigate to="/auth"></Navigate>}></Route>
            <Route path="/" element={<Navigate to="/app"></Navigate>}></Route>
        </Routes>
    )
}

export default AppRoutes;
