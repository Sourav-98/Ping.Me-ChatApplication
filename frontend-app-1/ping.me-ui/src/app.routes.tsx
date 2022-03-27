import React from 'react';
import { Routes, Route } from 'react-router';

import AuthRoutes from 'Components/Authentication/auth.routes';

const AppRoutes = function({...props}){
    return(
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
        </Routes>
    )
}

export default AppRoutes;