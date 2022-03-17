
import React, { useContext } from 'react';
import AlertsContext from 'Context/AlertsContext/AlertsContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AlertGroup.css';

import { AlertTemplate } from 'UI/Notifications';
import { useEffect } from 'react';

const AlertGroupContainer : React.FC<{ max : number }> = ({max, ...props}) => {

    const appContext = useContext(AlertsContext);

    useEffect(() => {
        /** To restrict the number of alerts displated to the max limit set */
        if(appContext.getAlerts().length === max+1){
            appContext.removeLastAlert();
        }
    }, [appContext.getAlerts()])

    return(
        <TransitionGroup className='alert-toaster-group-container-div'>
            {
                appContext.getAlerts().map((alertItem) => 
                    <CSSTransition
                        key={alertItem.id}
                        classNames='alert-toaster-group'
                        timeout={{
                            enter: 1100,
                            exit: 1000
                        }}
                    >
                        <AlertTemplate autoClose={alertItem.autoClose} outlined={alertItem.template === 'outlined'} secondary={alertItem.type === 'secondary'} success={alertItem.type === 'success'} danger={alertItem.type === 'danger'} warning={alertItem.type === 'warning'} closeFunc={() => {appContext.removeAlert(alertItem.id)}}>{alertItem.message}</AlertTemplate>
                    </CSSTransition>
                )
            }
        </TransitionGroup>
    )
}

export const AlertGroup = React.memo(AlertGroupContainer);
