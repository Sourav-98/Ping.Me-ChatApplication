import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import LoginPage from './Components/Auth/Login/LoginPage';
import RegisterPage from './Components/Auth/Register/RegisterPage';

function App() {

	return (
		<div className="app-root">
			<LoginPage/>
			{/* <RegisterPage></RegisterPage> */}
		</div>
  );
}

export default App;
