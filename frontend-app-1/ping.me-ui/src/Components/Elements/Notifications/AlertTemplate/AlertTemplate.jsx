import './AlertTemplate.css';

import React, { useState, useEffect, useRef } from 'react';

import { IoMdCheckmarkCircleOutline, IoMdClose, IoMdCloseCircleOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

export default function AlertTemplate({outlined, closeFunc, primary, secondary, success, danger, warning, children, ...props}){

    const delayCloseTimer = useRef(undefined);

    useEffect(() => {
        delayCloseTimer.current = setTimeout(closeFunc, 6500);
    }, []);

    const noDelayClose = () => {
        clearTimeout(delayCloseTimer.current);
        closeFunc();
    }

    return(
        <div className='alert-toaster-wrapper'>
            <div className={`alert-toaster-div${outlined ? ' outlined' : ''}${secondary ? ' secondary' : success ? ' success' : danger ? ' danger' : warning ? ' alert' : ' primary'}`}>
                <div className='alert-toaster-type'>
                    { success ? <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline> : danger ? <IoMdCloseCircleOutline></IoMdCloseCircleOutline> : warning ? <IoWarningOutline></IoWarningOutline> : <IoMdInformationCircleOutline></IoMdInformationCircleOutline>}
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
