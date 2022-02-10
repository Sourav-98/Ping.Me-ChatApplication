
import React, { useContext } from 'react';
import AppContext from 'Context/AppContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AlertGroup.css';

import { AlertTemplate } from 'Components/Elements/Notifications';
import { useEffect } from 'react';

function AlertGroupContainer({max, ...props}){

    const appContext = useContext(AppContext);

    useEffect(() => {
        if(appContext.alertsList.length === max+1){
            appContext.removeLastAlert();
        }
    }, [appContext.alertsList])

    return(
        <TransitionGroup className='alert-toaster-group-container-div'>
            {
                appContext.alertsList.map((alertItem) => 
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
