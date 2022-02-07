
import './App.css';

import { useState, useEffect } from 'react';
import { v4 as uuid} from 'uuid';

import AlertContext from 'Components/Utilities/AlertContext';
import LoginPage from 'Components/Authentication/Login/LoginPage';
import RegisterPage from 'Components/Authentication/Register/RegisterPage';

import { AlertGroup } from 'Components/Elements/Notifications';

function App() {

	/** ----------- Alert Context Data --------------
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

	const pushAlert = (message, type=undefined) => {
		let tempAlertsList = [...alertsList];
		let id = uuid();
		tempAlertsList.push({
			id: id,
			message : message,
			type: type,
			closeTimeout: setTimeout(removeAlert(id), alertTimeoutDuration)
		});
		setAlertsList(() => tempAlertsList);
	}

	const removeAlert = (id) => {
		setAlertsList((alertsList) => alertsList.filter( alert => alert.id != id));
	}

	const alertUtil = {
		alertsList: alertsList,
		pushAlert,
		removeAlert
	}

	return (
		<AlertContext.Provider value={alertUtil}>
			<div className="app-root">
				{/* <LoginPage/> */}
				<RegisterPage/>
				<AlertGroup/>
			</div>
		</AlertContext.Provider>
  );
}

export default App;
