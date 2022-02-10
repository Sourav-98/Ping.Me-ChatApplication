// import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ProtectedRoute from './Components/Auth/ProtectedRoute/ProtectedRoute';

import LoginPage from './Components/Auth/Login/LoginPage';
import RegisterPage from './Components/Auth/Register/RegisterPage';
import PasswordResetPage from './Components/Auth/PasswordReset/PasswordReset'
import ChatHome from './Components/ChatHomeLayout2/ChatHome';
import Page404 from './Components/ErrorPages/Page404/Page404';

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return(
        <Router>
            <Switch>
                {/* <Route exact path="/login">
                    <LoginPage></LoginPage>
                </Route> */}
                <ProtectedRoute exact path="/login" redirectPath="/home" authState={!isAuthenticated}>
                    <LoginPage></LoginPage>
                </ProtectedRoute>
                <Route exact path="/register">
                    <RegisterPage></RegisterPage>
                </Route>
                <Route exact path="/password-reset">
                    <PasswordResetPage></PasswordResetPage>
                </Route>
                {/* <Route path="/home" component={ChatHome}></Route> */}
                <ProtectedRoute path="/home" redirectPath="/login" authState={isAuthenticated}>
                    <ChatHome></ChatHome>
                </ProtectedRoute>
                <Route path='*' component={Page404}></Route>
            </Switch>
        </Router>
    )
}

export default App;
