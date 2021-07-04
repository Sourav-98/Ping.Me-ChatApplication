// import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LoginPage from './Components/Auth/Login/LoginPage';
import RegisterPage from './Components/Auth/Register/RegisterPage';
import PasswordResetPage from './Components/Auth/PasswordReset/PasswordReset'
import ChatHome from './Components/ChatHomeLayout2/ChatHome';

function App() {
    return(
        <Router>
            <Switch>
                <Route exact path='/home'>
                    <ChatHome></ChatHome>
                </Route>
                <Route exact path='/register'>
                    <RegisterPage/>
                </Route>
                <Route exact path='/password-reset'>
                    <PasswordResetPage></PasswordResetPage>
                </Route>
                <Route exact path='/'>
                    <LoginPage></LoginPage>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
