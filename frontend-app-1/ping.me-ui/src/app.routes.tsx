import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import AuthRoutes from 'Components/Authentication/auth.routes';
import UserHomeRoutes from 'Components/UserHome/userHome.routes';

const AppRoutes : React.FC<{isAuthenticated : boolean}> = function({isAuthenticated, ...props}){
    return(
        <Routes>
            <Route path="/auth/*" element={(!isAuthenticated) ? <AuthRoutes></AuthRoutes> : <Navigate to="/app"></Navigate>}></Route>
            <Route path="/app/*" element={(isAuthenticated) ? <UserHomeRoutes></UserHomeRoutes>: <Navigate to="/auth"></Navigate>}></Route>
        </Routes>
    )
}

export default AppRoutes;
