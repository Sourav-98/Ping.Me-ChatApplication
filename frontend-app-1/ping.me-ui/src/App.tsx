
import './App.css';
import React, { useState } from 'react';
import { AlertContextProvider } from 'Context/AlertContext/AlertContext';
import AppRoutes from 'App.routes';
import { AlertGroup } from 'Components/Commons/AlertGroup/AlertGroup';
import { BackDrop } from 'Components/Commons/BackDrop/BackDrop';
import { ThemeProvider } from '@mui/material';
import { theme } from 'Theme/App.theme';

function App() {

	/**------------SESSION DATA------------------ */

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => true);

	return (
		<ThemeProvider theme={theme}>
			<AlertContextProvider>
				<div className="app-root">
					<AppRoutes isAuthenticated={isAuthenticated}></AppRoutes>
					<AlertGroup max={6} />
					<BackDrop></BackDrop>
				</div>
			</AlertContextProvider>
		</ThemeProvider>

	);
}

export default App;
