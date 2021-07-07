

import './../AuthStyles.css';
import './RegisterPage.css';


import { useState } from 'react';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import brandLogo from './../../../assets/ping.Me Logo NEW 3.png';

export default function RegisterPage(){

    const [passwordVisible, setPasswordVisible] = useState(false);

    async function togglePasswordVisibility(){
        setTimeout(()=>{
            console.log(passwordVisible);
            setPasswordVisible(!passwordVisible);
        }, 50);
    }

    function registerFormHandler(event){
        event.preventDefault();
    }

    return(
        <div className="auth-page-container">
            <div className="auth-brand-panel">
                <div className="auth-brand-box">
                    <div className="auth-brand-logo">
                        <img src={brandLogo} alt="Ping.Me Logo"></img>
                    </div>
                    <div className="auth-brand-title">
                        <h1>Ping.Me</h1>
                    </div>
                    <div className="auth-brand-subtitle">
                        <span>Chat Anywhere, Anytime, and with Anyone!</span>
                    </div>
                </div>
            </div>
            <div className="auth-form-panel">
                <div className="auth-form-box">
                    <h1>Create Account</h1>
                    <form onSubmit={registerFormHandler} className="auth-form">
                        <input className="cm-input round" type="text" placeholder="Enter Your Name"></input>
                        <input className="cm-input round" type="text" placeholder="Enter Email Id"></input>
                        <div className="password-input-box">
                            <input type={ passwordVisible ? "text" : "password" } name="password" className="cm-input round" placeholder="Enter Password"/>
                            <button type="button" className="password-visible-button" onClick={togglePasswordVisibility}>
                                { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
                            </button>                        
                        </div>
                        <input type="password" name="password-confirm" className="cm-input round" placeholder="Re-Type Password"/>
                        <br/>
                        <button type="submit" className="cm-button outlined round primary auth-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
