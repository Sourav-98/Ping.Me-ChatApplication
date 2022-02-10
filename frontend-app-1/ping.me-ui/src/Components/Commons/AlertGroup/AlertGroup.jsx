
import React, { useContext } from 'react';
import AppContext from 'Context/AppContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AlertGroup.css';

import { AlertTemplate } from 'Components/Elements/Notifications';
// import { Alert } from './Alert/Alert';
// import { useEffect } from 'react';
// import { useState } from 'react';

import { IoMdCheckmarkCircleOutline, IoMdClose, IoMdCloseCircleOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

function AlertGroupContainer({...props}){

    const appContext = useContext(AppContext);

    return(
        <TransitionGroup className='alerts-container'>
            {
                appContext.alertsList.map((alertItem) => 
                    <CSSTransition
                        key={alertItem.id}
                        classNames='alert-toaster-animation'
                        timeout={{
                            enter: 1100,
                            exit: 1000
                        }}
                    >
                        <AlertTemplate outlined={alertItem.template === 'outlined'} secondary={alertItem.type === 'secondary'} success={alertItem.type === 'success'} danger={alertItem.type === 'danger'} warning={alertItem.type === 'warning'} closeFunc={() => {appContext.removeAlert(alertItem.id)}}>{alertItem.message}</AlertTemplate>
                    </CSSTransition>
                )
            }
        </TransitionGroup>
    )
}

export const AlertGroup = React.memo(AlertGroupContainer);
