
import './App.css';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import AlertsContext from 'Context/AlertsContext/AlertsContext';
import { AlertObjectType } from 'Context/AlertsContext/AlertContextType';
// import AlertContext from 'Components/Utilities/AlertContext';
// import LoginPage from 'Components/Authentication/Login/LoginPage';
// import RegisterPage from 'Components/Authentication/Register/RegisterPage';

import AuthRoutes from 'Components/Authentication/auth.routes';

import { AlertGroup } from 'Components/Commons/AlertGroup/AlertGroup';

function App() {

	/** ----------------- Alerts Global Context Data ----------------------
	 * alertsList is a list of objects structured:
	 * 		{
	 * 			id: unique alert id,
	 * 			message: the message the Alert would contain
	 * 			template: 
	 * 			type: type of alert -> primary(default) | secondary | success | danger | warning
	 * 			closeTimeout: a setTimeout
	 * 		}
	 */

	const [alertsList, setAlertsList] = useState<Array<AlertObjectType>>([]);

	const getAlerts = () : Array<AlertObjectType> => {
		return alertsList;
	}
	
	const pushAlert = ({message = '', template = '', type = '', autoClose = true}) : void => {
		let id : string = uuid();
		console.log('Alert pushed -> id: ' + id + + ' <->  message: ' + message + ' <-> type: ' + type);
		setAlertsList( prevAlertsList => [
			{
				id: id,
				message: message,
				template: template,
				type: type,
				autoClose: autoClose
			}, ...prevAlertsList
		]);
	}

	const removeAlert = (id? : string) : void => {
		console.log('Alert Removed -> ' + id);
		setAlertsList(prevAlertsList => prevAlertsList.filter( alert => alert.id !== id ));
	}

	const removeLastAlert = () :  void => {
		console.log('Last Alert Removed');
		let tempAlerts = [...alertsList];
		tempAlerts.pop();
		setAlertsList(() => tempAlerts);
	}

	const alertUtil = {
		getAlerts,
		pushAlert,
		removeAlert,
		removeLastAlert
	}

	/**---------------------------------------------------------- */

	return (
		<AlertsContext.Provider value={alertUtil}>
			<div className="app-root">
				<AuthRoutes isAuthenticated={true}></AuthRoutes>
				<AlertGroup max={6}/>
			</div>
		</AlertsContext.Provider>
  );
}

export default App;
