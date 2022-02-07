import './Alert.css';

import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { IoMdCheckmarkCircleOutline, IoMdClose, IoMdCloseCircleOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

function AlertElement({message, isVisible, closeFunc, autoClose, delay, outlined, primary, secondary, success, danger, warning, children, ...props}){

    const defaultDelay = 6500;
    const timeoutDelay = delay ? delay : defaultDelay;

    const delayedCloseTimer = useRef(undefined);

    const onEnteredHandler = () => {
        if(autoClose){  // set a timeout to close the
            delayedCloseTimer.current = setTimeout(closeFunc, timeoutDelay);
        }
    }

    const onExitHandler = () => {   
        if(delayedCloseTimer.current){  // clear the the close timer before the alert is exited
            clearTimeout(delayedCloseTimer.current);
        }
    }

    return(
        <CSSTransition
            in={isVisible}
            onEntered={onEnteredHandler}
            onExit={onExitHandler}
            classNames='alert-toaster'
            timeout={600}
            unmountOnExit
        >
            <div className={`alert-toaster${outlined ? ' outlined' : ''}${secondary ? ' secondary' : success ? ' success' : danger ? ' danger' : warning ? ' alert' : ' primary'}`}>
                <div className='alert-toaster-type'>
                    { success ? <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : danger ? <IoMdCloseCircleOutline></IoMdCloseCircleOutline> : warning ? <IoWarningOutline></IoWarningOutline> : <IoMdInformationCircleOutline></IoMdInformationCircleOutline>}
                </div>
                <div className='alert-toaster-content'>
                    {children}
                </div>
                <div className='alert-toaster-action' onClick={closeFunc}>
                    <IoMdClose></IoMdClose>
                </div>
            </div>
        </CSSTransition>
    )
}

export const Alert = React.memo(AlertElement);
