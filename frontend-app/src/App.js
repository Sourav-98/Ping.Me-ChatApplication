// import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

// import ChatArea from './ChatArea/ChatArea';
// import SidePanel from './Components/ChatHome/SidePanel/SidePanel';

import LoginPage from './Components/Auth/Login/LoginPage';
import RegisterPage from './Components/Auth/Register/RegisterPage';
import ChatHome from './Components/ChatHome/ChatHome';

function App() {
    return(
        <Router>
            <Switch>
                <Route path='/home'>
                    <ChatHome></ChatHome>
                </Route>
                <Route path='/register'>
                    <RegisterPage/>
                </Route>
                <Route path='/'>
                    <LoginPage></LoginPage>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
