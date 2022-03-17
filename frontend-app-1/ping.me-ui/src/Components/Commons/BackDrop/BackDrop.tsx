
import React, { useContext } from 'react';

import {CSSTransition} from 'react-transition-group';
import AlertsContext from 'Context/AlertsContext/AlertsContext';

import { PingMeIconLoader } from 'UI/PreLoaders/PingMeIconLoader/PingMeIconLoader';

import { InfinityPreloader } from 'UI/PreLoaders/InfinityPreloader/InfinityPreloader';

import './BackDrop.css';

export const BackDrop : React.FC = () => {

    const alertsContext = useContext(AlertsContext);

    return(
            <CSSTransition
                in={alertsContext.getBackdropStatus()}
                classNames='backdrop-container-fade'
                timeout={200}
                unmountOnExit
                onClick={alertsContext.toggleBackdropOff}
            >
                <div className="backdrop-container">
                    <div className="backdrop-loader">
                        <PingMeIconLoader></PingMeIconLoader>
                    </div>
                </div>
            </CSSTransition>
    )
}
