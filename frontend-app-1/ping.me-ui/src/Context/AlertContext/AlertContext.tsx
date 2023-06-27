
import React, { useState } from 'react';

import { AlertObjectType, AlertsContextInterface } from './AlertContextType';
import { v4 as uuid } from 'uuid';

let AlertsContextDefault = {
    getAlerts : () : Array<AlertObjectType> => {return []},
    pushAlert : (alert : AlertObjectType) : void => {},
    removeAlert : (alertId?: string) : void => {},
    removeLastAlert : () : void => {},
    toggleBackdropOn : () : void => {},
    toggleBackdropOff : () : void => {},
    getBackdropStatus : () : boolean => false
}

const AlertContext : React.Context<AlertsContextInterface> = React.createContext<AlertsContextInterface>(AlertsContextDefault);

export const AlertContextProvider: React.FC<{children: React.ReactNode}> = ({...props}): JSX.Element => {

    const [alertsList, setAlertsList] = useState<Array<AlertObjectType>>([]);
	const [isBackDropOn, setBackdrop] = useState<boolean>(() => false);

	const getAlerts = () : Array<AlertObjectType> => {
		return alertsList;
	}
	
	const pushAlert = ({message = '', template = '', type = '', autoClose = true, autoCloseDuration = 6500}) : void => {
		let id : string = uuid();
		setAlertsList( prevAlertsList => [
			{
				id: id,
				message: message,
				template: template,
				type: type,
				autoClose: autoClose,
				autoCloseDuration: autoCloseDuration
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

	const toggleBackdropOn = () : void => {
		setBackdrop(true)
	}

	const toggleBackdropOff = () : void => {
		setBackdrop(false);
	}

	const getBackdropStatus = () : boolean => {
		return isBackDropOn;
	}

    return (
        <AlertContext.Provider value={{
            getAlerts: getAlerts,
            pushAlert: pushAlert,
            removeAlert: removeAlert,
            removeLastAlert: removeLastAlert,
            toggleBackdropOff: toggleBackdropOff,
            toggleBackdropOn: toggleBackdropOn,
            getBackdropStatus: getBackdropStatus
        }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertContext;