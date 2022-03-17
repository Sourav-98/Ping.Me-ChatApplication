
import React from 'react';
import './PingMeIconLoader.css';

import logo from 'assets/ping.Me Logo NEW 3.png';

export const PingMeIconLoader : React.FC = () => {
    return(
        <div className="ping-container">
            <div className="logo">
                <img src={logo}></img>
            </div>
            <div className="pulse-ring1"></div>
            <div className="pulse-ring2"></div>
        </div>
    )
}
