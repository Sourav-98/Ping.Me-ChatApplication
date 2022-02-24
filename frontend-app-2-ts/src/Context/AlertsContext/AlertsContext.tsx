
import React, { useState } from 'react';

import { AlertObjectType, AlertsContextInterface } from './AlertContextType';

let AlertsContextInterfaceDefault = {
    alertsList : [],
    pushAlert : (alert : AlertObjectType) : void => {},
    removeAlert : (alertId?: string) : void => {},
    removeLastAlert : () : void => {},
}

const AlertsContext = React.createContext<AlertsContextInterface>(AlertsContextInterfaceDefault);

export default AlertsContext;
