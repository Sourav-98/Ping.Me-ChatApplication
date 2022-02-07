
import React, { useState, useContext } from 'react';
import AlertContext from 'Components/Utilities/AlertContext';
import { TransitionGroup } from 'react-transition-group';
import './AlertGroup.css';
import { Alert } from './../Alert/Alert';

function AlertGroupContainer({...props}){

    const alertContext = useContext(AlertContext);

    const pushNewAlert = function(){

    }

    const autoClose = function(){

    }

    return(
        <TransitionGroup className='alerts-container'>
            {
                alertContext.alertsList.map((alertItem, index) => 
                    <Alert key={alertItem.id} outlined closeFunc={() => {alertContext.removeAlert(index)}}>{alertItem.message}</Alert>
                )
            }
        </TransitionGroup>
    )
}

export const AlertGroup = React.memo(AlertGroupContainer);
