
import './App.css';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import AlertsContext from 'Context/AlertsContext/AlertsContext';
import { AlertObjectType } from 'Context/AlertsContext/AlertContextType';
// import AlertContext from 'Components/Utilities/AlertContext';
import LoginPage from 'Components/Authentication/Login/LoginPage';
import RegisterPage from 'Components/Authentication/Register/RegisterPage';

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
		alertsList: alertsList,
		pushAlert,
		removeAlert,
		removeLastAlert
	}

	/**---------------------------------------------------------- */

	const [tbInput, setTbInput] = useState<string | undefined>(() => undefined);
	const [tbFocus, setTbFocus] = useState<string | undefined>(() => undefined);
	const [tbBlur, setTbBlur] = useState<string | undefined>(() => undefined);

	const tbInputHandler : React.ChangeEventHandler<HTMLInputElement> = (event : React.ChangeEvent<HTMLInputElement>) => {
		setTbInput(() => event.target.value);
	}

	const tbFocusHandler : React.ChangeEventHandler<HTMLInputElement> = (event : React.ChangeEvent<HTMLInputElement>) => {
		setTbFocus(() => event.target.value);
	}

	const tbBlurHandler : React.ChangeEventHandler<HTMLInputElement> = (event : React.ChangeEvent<HTMLInputElement>) => {
		setTbBlur(() => event.target.value);
	}

	return (
		<AlertsContext.Provider value={alertUtil}>
			<div className="app-root">
				{/* <LoginPage/> */}
				<RegisterPage/>
				<AlertGroup max={6}/>
			</div>
		</AlertsContext.Provider>
  );
}

export default App;
