
import './RegisterPage.css';


import { useState} from 'react';

import { Link } from 'react-router-dom';

import GoogleSvg from './../../../assets/google-color.svg';
import FacebookSvg from './../../../assets/facebook-color.svg';
import TwitterSvg from './../../../assets/twitter-color.svg';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';


import brandLogo from './../../../assets/ping.Me Logo NEW 3.png';

export default function RegisterPage(){
    return(
        <div className="register-page-container">
            <div className="brand-panel">
                <div className="brand-logo">
                    <img src={brandLogo} alt="Ping.Me Logo"></img>
                </div>
                <div className="brand-title">
                    <h1>Ping.Me</h1>
                </div>
                <div className="brand-subtitle">
                    <span> Chat Anywhere, Anytime, and with Anyone!</span>
                </div>
            </div>
            <div className="login-panel">
                
            </div>
        </div>
    )
}
