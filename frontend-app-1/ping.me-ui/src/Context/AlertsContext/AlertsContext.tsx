
import React, { useState } from 'react';

import { AlertObjectType, AlertsContextInterface } from './AlertContextType';
import { v4 as uuid } from 'uuid';

let AlertsContextInterfaceDefault = {
    getAlerts : () : Array<AlertObjectType> => {return []},
    pushAlert : (alert : AlertObjectType) : void => {},
    removeAlert : (alertId?: string) : void => {},
    removeLastAlert : () : void => {},
    toggleBackdropOn : () : void => {},
    toggleBackdropOff : () : void => {},
    getBackdropStatus : () : boolean => false
}

const AlertsContext : React.Context<AlertsContextInterface> = React.createContext<AlertsContextInterface>(AlertsContextInterfaceDefault);

export const AlertsContextContainer = (props : any) => {

    const [alertsList, setAlertsList] = useState<Array<AlertObjectType>>([]);
	const [isBackDropOn, setBackdrop] = useState<boolean>(() => false);

	const getAlerts = () : Array<AlertObjectType> => {
		return alertsList;
	}
	
	const pushAlert = ({message = '', template = '', type = '', autoClose = true, autoCloseDuration = 6500}) : void => {
		let id : string = uuid();
		console.log('Alert pushed -> id: ' + id + + ' <->  message: ' + message + ' <-> type: ' + type);
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
        <AlertsContext.Provider value={{
            getAlerts: getAlerts,
            pushAlert: pushAlert,
            removeAlert: removeAlert,
            removeLastAlert: removeLastAlert,
            toggleBackdropOff: toggleBackdropOff,
            toggleBackdropOn: toggleBackdropOn,
            getBackdropStatus: getBackdropStatus
        }}>
            {props.children}
        </AlertsContext.Provider>
    );
};

export default AlertsContext;
