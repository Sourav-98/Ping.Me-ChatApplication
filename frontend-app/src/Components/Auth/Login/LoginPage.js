
import { useState} from 'react';

import GoogleSvg from './../../../assets/google-color.svg';
import FacebookSvg from './../../../assets/facebook-color.svg';
import TwitterSvg from './../../../assets/twitter-color.svg';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import './LoginPage.css';

import brandLogo from './../../../assets/ping.Me Logo NEW 3.png';

export default function LoginPage(){
    const[passwordVisible, setPasswordVisible] = useState(false);

    function togglePasswordVisibility(){
        setTimeout(()=>{
            console.log(passwordVisible);
            setPasswordVisible(!passwordVisible);
        }, 50);
    }

    return(
        <div className="login-page-container">
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
                <div className="login-title">
                    <h1>Welcome</h1>
                </div>
                <div className="login-form">
                    <input className="login-form-input" type="text" placeholder="Username or Email"></input>
                    <div className="password-input-box">
                        <input type={ passwordVisible ? "text" : "password" } name="password" className="login-form-input" placeholder="Password"/>
                        <div className="password-visible-box" onClick={togglePasswordVisibility}>
                            { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
                        </div>
                    </div>
                    <div className="remember-me-box">
                        <input type="checkbox" id="rememberMeCheck"></input>
                        <label for="rememberMeCheck"> &nbsp; Remember Me</label>
                    </div>
                    <button className="login-button">Login</button>
                    <div className="passport-login">
                        <div className='passport-login-option'>
                            <img src={GoogleSvg} alt="Google Login"></img>
                        </div>
                        <div className='passport-login-option'>
                            <img src={FacebookSvg} alt="Facebook Login"></img>
                        </div>
                        <div className='passport-login-option'>
                            <img src={TwitterSvg} alt="Twitter Login"></img>
                        </div>
                    </div>
                </div>
                <div className="login-options">
                    <div className="forgot-password-option">
                        Forgot Password?
                    </div>
                    <div className="create-account-option">
                        New to Ping.Me? Sign Up
                    </div>
                </div>
            </div>
        </div>
    )
}
