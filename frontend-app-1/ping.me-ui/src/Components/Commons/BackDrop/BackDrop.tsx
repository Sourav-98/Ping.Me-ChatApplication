
import React, { useContext } from 'react';

import {CSSTransition} from 'react-transition-group';
import AlertContext from 'Context/AlertContext/AlertContext';

import { PingMeIconLoader } from 'UI/PreLoaders/PingMeIconLoader/PingMeIconLoader';

import './BackDrop.css';

export const BackDrop : React.FC = () => {

    const alertContext = useContext(AlertContext);

    return(
            <CSSTransition
                in={alertContext.getBackdropStatus()}
                classNames='backdrop-container-fade'
                timeout={200}
                unmountOnExit
                onClick={alertContext.toggleBackdropOff}
            >
                <div className="backdrop-container">
                    <div className="backdrop-loader">
                        <PingMeIconLoader></PingMeIconLoader>
                    </div>
                </div>
            </CSSTransition>
    )
}
