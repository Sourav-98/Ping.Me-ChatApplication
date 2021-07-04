
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import GoogleSvg from './../../../assets/google-color.svg';
import FacebookSvg from './../../../assets/facebook-color.svg';
import TwitterSvg from './../../../assets/twitter-color.svg';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import './LoginPage.css';

import brandLogo from './../../../assets/ping.Me Logo NEW 3.png';

export default function LoginPage(){

    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [userRememberCheck, setUserRememberCheck] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    async function togglePasswordVisibility(){
        setTimeout(()=>{
            console.log(passwordVisible);
            setPasswordVisible(!passwordVisible);
        }, 50);
    }

    function usernameInputHandler(event){
        setUsername(event.target.value);
    }

    function passwordInputHandler(event){
        setPassword(event.target.value);
    }

    function rememberCheckHandler(event){
        setUserRememberCheck(!userRememberCheck);
    }

    async function loginFormSubmitHandler(event){
        event.preventDefault();
    }

    async function getUrlEncoded(formData){
        let formBody = Array();
        for(let element in formData){
            let key = encodeURIComponent(element);
            let value = encodeURIComponent(formData[element]);
            formBody.push(key + "=" + value);
        }
        formBody = formBody.join('&');
        return formBody;
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
                    <span>Chat Anywhere, Anytime, and with Anyone!</span>
                </div>
            </div>
            <div className="login-panel">
                <div className="login-title">
                    <h1>Welcome</h1>
                </div>
                <div>
                    <form onSubmit={loginFormSubmitHandler} className="login-form">
                        <input className="cm-input round" type="text" placeholder="Username or Email"></input>
                        <div className="password-input-box">
                            <input type={ passwordVisible ? "text" : "password" } name="password" className="cm-input round" placeholder="Password"/>
                            <button className="password-visible-button" onClick={togglePasswordVisibility}>
                                { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
                            </button>                        </div>
                        <div className="remember-me-box">
                            <input type="checkbox" defaultChecked={userRememberCheck} onChange={rememberCheckHandler} id="rememberMeCheck"></input>
                            <label htmlFor="rememberMeCheck"> &nbsp; Remember Me</label>
                        </div>
                        <button type="submit" className="cm-button outlined round primary login-button">Login</button>
                    </form>
                </div>
                <div className="passport-login">
                    <button className="passport-login-option">
                        <img src={GoogleSvg} alt="Google Login"></img>
                    </button>
                    <button className="passport-login-option">
                        <img src={FacebookSvg} alt="Facebook Login"></img>
                    </button>
                    <button className="passport-login-option">
                        <img src={TwitterSvg} alt="Twitter Login"></img>
                    </button>
                </div>
                <div className="login-options">
                    <div className="forgot-password-option">
                        <Link to="/password-reset">Forgot Password?</Link>
                    </div>
                    <div className="create-account-option">
                        <Link to='/register'>New to Ping.Me? Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
