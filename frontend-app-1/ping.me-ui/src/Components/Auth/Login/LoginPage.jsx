
import { useState, useEffect } from 'react';

import AuthPageTemplate from '../templates/AuthPage.template';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './LoginPage.css';

export default function LoginPage({breakpoints, windowWidth, ...props}){

    const LoginForm = (
        <div className='login-form-main-div'>
            <TextInput round type={'text'} placeholder={'Username or Email Id'}></TextInput>
            <PasswordInput round placeholder={'Password'}></PasswordInput>
            <button type='button' className='cm-button round primary'>Login</button>
            <hr></hr>
            <div className='passport-login-options-div'>
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
                    <a href="#">Forgot Password?</a>
                </div>
                <div className="create-account-option">
                    <a href="#">Sign Up</a>
                </div>
            </div>
        </div>
    );

    return(
        <>
            <AuthPageTemplate AuthForm={LoginForm}></AuthPageTemplate>
        </>
    )
}
