import './Alert.css';

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { AlertType } from './AlertType';

import { AlertTemplate } from 'Components/Elements/Notifications';

const AlertElement : React.FC <AlertType> = ({message, isVisible, closeFunc, autoClose, delay, topLeft, topCenter, topRight, bottomRight, bottomCenter, bottomLeft, outlined, primary, secondary, success, danger, warning, children, ...props}) => {

    return(
        <div className={`alert-toaster-single-container-div${topLeft ? ' top-left' : topCenter ? ' top-center' : topRight ? ' top-right' : bottomRight ? ' bottom-right' : bottomLeft ? ' bottom-left' : ' bottom-center'}`}>
            <CSSTransition
                in={isVisible}
                classNames='alert-toaster-single'
                timeout={600}
                unmountOnExit
            >
                <AlertTemplate outlined={outlined} autoClose={autoClose} closeFunc={closeFunc} primary={primary} secondary={secondary} success={success} danger={danger} warning={warning}>{children}</AlertTemplate>
            </CSSTransition>
        </div>
    )
}

export const Alert = React.memo(AlertElement);
