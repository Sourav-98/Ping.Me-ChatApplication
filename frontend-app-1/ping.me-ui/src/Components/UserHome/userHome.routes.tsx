import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router";

import UserHomePageTemplate from "./templates/UserHomePage.template";

import UserSettings from "./UserSettings/UserSettings";

const ChatDashboard = React.lazy(() => import('./ChatDashboard/ChatDashboard'));
// import ChatDashboard from "./ChatDashboard/ChatDashboard";


const UserHomeRoutes : React.FC = () => {
    return(
        <UserHomePageTemplate>
            <Routes>
                <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><ChatDashboard></ChatDashboard></Suspense>}></Route>
                <Route path="/settings/*" element={<UserSettings></UserSettings>}></Route>
                <Route path="/calls"></Route>
                <Route path="/videos"></Route>
                <Route path="/" element={<Navigate to="./dashboard"></Navigate>}></Route>
            </Routes>
        </UserHomePageTemplate>
    )
}

export default UserHomeRoutes;