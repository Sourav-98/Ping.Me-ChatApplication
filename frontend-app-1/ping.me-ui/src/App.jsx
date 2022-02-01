
import './App.css';

import { useState, useEffect } from 'react';

import LoginPage from 'Components/Authentication/Login/LoginPage';
import RegisterPage from 'Components/Authentication/Register/RegisterPage';

function App() {

	return (
		<div className="app-root">
			{/* <LoginPage/> */}
			<RegisterPage/>
		</div>
  );
}

export default App;
