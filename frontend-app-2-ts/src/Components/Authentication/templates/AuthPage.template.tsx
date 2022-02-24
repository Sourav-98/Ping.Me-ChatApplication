import React from 'react';

import logo from 'assets/ping.Me Logo NEW 3.png';
import './AuthStyles.css';

const AuthPageTemplate : React.FC = ({...props}) => {
    return(
        <div className='auth-page-container'>
            <div className='auth-page-app-branding-container'>
                <div className='app-branding-image-div'>
                    <img src={logo}></img>
                </div>
                <div className='app-branding-main-header'>
                    <h1>Ping.Me</h1>
                </div>
                <div className='app-branding-sub-header'>
                    <h1>Chat with Anyone, Anywhere, and Anytime</h1>
                </div>
            </div>
            <div className='auth-form-container'>
                {props.children}
            </div>
        </div>
    )
}

export default AuthPageTemplate;
