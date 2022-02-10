
import './App.css';

import { useState, useEffect } from 'react';
import { v4 as uuid} from 'uuid';

import AppContext from 'Context/AppContext';
// import AlertContext from 'Components/Utilities/AlertContext';
import LoginPage from 'Components/Authentication/Login/LoginPage';
import RegisterPage from 'Components/Authentication/Register/RegisterPage';

import {AlertGroup} from 'Components/Commons/AlertGroup/AlertGroup';

function App() {

	/** ----------------- Alerts Global Context Data ----------------------
	 * alertsList is a list of objects structured:
	 * 		{
	 * 			id: unique alert id,
	 * 			message: the message the Alert would contain
	 * 			type: type of alert -> primary(default) | secondary | success | danger | warning
	 * 			closeTimeout: a setTimeout
	 * 		}
	 */
	const [alertsList, setAlertsList] = useState([]);

	const alertTimeoutDuration = 6500;

	const pushAlert = (message, template=undefined, type=undefined, autoClose=true) => {
		let id = uuid();
		console.log('Alert pushed -> id: ' + id + + ' <->  message: ' + message + ' <-> type: ' + type);
		setAlertsList(prevAlertsList => [
			{
				id: id,
				message: message,
				template: template,
				type: type
			}, ...prevAlertsList
		]);
	}

	const removeAlert = (id) => {
		console.log('Alert Removed -> ' + id);
		let tempAlerts = alertsList.filter( alert => alert.id != id);
		console.log(tempAlerts);
		setAlertsList(prevAlertsList => prevAlertsList.filter( alert => alert.id !== id ));
	}

	const alertUtil = {
		alertsList: alertsList,
		pushAlert,
		removeAlert
	}

	/**---------------------------------------------------------- */

	return (
		<AppContext.Provider value={alertUtil}>
			<div className="app-root">
				{/* <LoginPage/> */}
				<RegisterPage/>
				<AlertGroup/>
			</div>
		</AppContext.Provider>
  );
}

export default App;
