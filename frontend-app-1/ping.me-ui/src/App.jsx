import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import LoginPage from './Components/Auth/Login/LoginPage';
import RegisterPage from './Components/Auth/Register/RegisterPage';

function App() {

	// const breakpoints = {
	// 	mobile : 578,
	// 	tablet : 768,
	// 	desktop : 1024,
	// 	xldesktop : 1378
	// }

	// const [width, setWidth] = useState();

	// useEffect(()=>{
	// 	windowResizeHandle();
	// 	window.addEventListener('resize', windowResizeHandle);
	// 	return ()=>{
	// 		window.removeEventListener('resize', windowResizeHandle);
	// 	}
	// }, []);

	// const windowResizeHandle = ()=>{
	// 	setWidth(() => window.innerWidth);
	// }

	return (
		<div className="app-root">
			<LoginPage/>
			{/* <RegisterPage></RegisterPage> */}
		</div>
  );
}

export default App;
