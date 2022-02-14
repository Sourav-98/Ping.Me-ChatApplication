import './AlertTemplate.css';

import React, { useEffect, useRef } from 'react';

import { IoMdCheckmarkCircleOutline, IoMdClose, IoMdCloseCircleOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline, IoWarning } from 'react-icons/io5';

export default function AlertTemplate({outlined, closeFunc, autoClose, primary, secondary, success, danger, warning, children, ...props}){

    const delayCloseTimer = useRef(undefined);

    useEffect(() => {
        if(autoClose){
            delayCloseTimer.current = setTimeout(closeFunc, 6500);
        }
    }, []);

    const noDelayClose = () => {
        if(delayCloseTimer){
            clearTimeout(delayCloseTimer.current);
        }
        closeFunc();
    }

    return(
        <div className='alert-toaster-wrapper'>
            <div className={`alert-toaster-div${outlined ? ' outlined' : ''}${secondary ? ' secondary' : success ? ' success' : danger ? ' danger' : warning ? ' warning' : ' primary'}`}>
                <div className='alert-toaster-type'>
                    { success ? <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : danger ? <IoWarning></IoWarning> : warning ? <IoWarningOutline></IoWarningOutline> : <IoMdInformationCircleOutline></IoMdInformationCircleOutline>}
                </div>
                <div className='alert-toaster-content'>
                    {children}
                </div>
                <div className='alert-toaster-action' onClick={noDelayClose}>
                    <IoMdClose></IoMdClose>
                </div>
            </div>
        </div>
    )
}
