
import './App.css';
import React, { useState } from 'react';
import { AlertContextProvider } from 'Context/AlertContext/AlertContext';
import AppRoutes from 'App.routes';
import { AlertGroup } from 'Components/Commons/AlertGroup/AlertGroup';
import { BackDrop } from 'Components/Commons/BackDrop/BackDrop';

function App() {

	/**------------SESSION DATA------------------ */

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => true);

	return (
		<AlertContextProvider>
			<div className="app-root">
				<AppRoutes isAuthenticated={isAuthenticated}></AppRoutes>
				<AlertGroup max={6} />
				<BackDrop></BackDrop>
			</div>
		</AlertContextProvider>

	);
}

export default App;
