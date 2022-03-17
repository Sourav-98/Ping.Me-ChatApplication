import './AlertTemplate.css';
import { AlertTemplateType } from './AlertTemplateType';

import React, { useEffect, useRef } from 'react';

import { IoMdCheckmarkCircleOutline, IoMdClose, IoMdCloseCircleOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline, IoWarning } from 'react-icons/io5';

const AlertTemplate : React.FC<AlertTemplateType> = ({outlined, closeFunc, autoClose, primary, secondary, success, danger, warning, children, ...props}) => {

    const delayCloseTimer : React.MutableRefObject<NodeJS.Timeout>= useRef(setTimeout(() => {}, 0));

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

export default AlertTemplate;
