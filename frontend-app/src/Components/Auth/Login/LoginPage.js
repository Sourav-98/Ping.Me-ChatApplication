
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import GoogleSvg from './../../../assets/google-color.svg';
import FacebookSvg from './../../../assets/facebook-color.svg';
import TwitterSvg from './../../../assets/twitter-color.svg';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import './../AuthStyles.css';
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

    // function usernameInputHandler(event){
    //     setUsername(event.target.value);
    // }

    // function passwordInputHandler(event){
    //     setPassword(event.target.value);
    // }

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
                    <h1>Welcome</h1>
                    <form onSubmit={loginFormSubmitHandler} className="auth-form">
                        <input className="cm-input round" type="text" placeholder="Username or Email"></input>
                        <div className="password-input-box">
                            <input type={ passwordVisible ? "text" : "password" } name="password" className="cm-input round" placeholder="Password"/>
                            <button type="button" className="password-visible-button" onClick={togglePasswordVisibility}>
                                { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
                            </button>                        
                        </div>
                        <div className="remember-me-box">
                            <input type="checkbox" defaultChecked={userRememberCheck} onChange={rememberCheckHandler} id="rememberMeCheck"></input>
                            <label htmlFor="rememberMeCheck"> &nbsp; Remember Me</label>
                        </div>
                        <button type="submit" className="cm-button outlined round primary auth-button">Login</button>
                    </form>
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
                            <Link to='/register'>New User? Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
