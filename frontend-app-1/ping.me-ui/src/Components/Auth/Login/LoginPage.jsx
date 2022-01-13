
import { useState } from 'react';

import AuthPageTemplate from '../templates/AuthPage.template';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';
import { DefaultButton } from 'elements/Button/DefaultButton/DefaultButton';
import { CheckboxGroup } from 'elements/Input/CheckboxGroup/CheckboxGroup';

import './LoginPage.css';

export default function LoginPage({breakpoints, windowWidth, ...props}){

    //--------------------------------------Username-------------------------------------------------------
    const [usernameInput, setUsernameInput] = useState(() => undefined);
    const [usernameErrorStatus, setUsernameErrorStatus] = useState({text : '', status : false});

    const usernameInputHandler = (event)=>{
        setUsernameInput((usernameInput) => event.target.value);
    }

    const resetUsernameErrorStatus = () => {
        setUsernameErrorStatus({text : '', status : false});    // disable error messages
    }

    const isUsernameInputValid = () => {
        if(!usernameInput){
            setUsernameErrorStatus({text : 'Username or Email Id should not be empty', status: true});
            return false;
        }
        else{
            // Email Regex
            let emailRegex = /[a-zA-Z0-9\._]+@[a-z]{3,10}\.[a-z]{2,5}/s;
            if(!emailRegex.test(usernameInput)){
                setUsernameErrorStatus({text : 'Please enter a valid Email Id', status: true});
                return false;
            }
            else{
                resetUserPasswordErrorStatus();
            }
        }
        return true;
    }

    //--------------------------------------Password-------------------------------------------------------
    const [userPasswordInput, setUserPasswordInput] = useState(() => undefined);
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState({text : '', status : false});

    const userPasswordInputHandler = (event) => {
        setUserPasswordInput(() => event.target.value)
    }

    const resetUserPasswordErrorStatus = () => {
        setUserPasswordErrorStatus({text : '', status: false});
    }

    const isUserPasswordInputValid = () => {
        if(!userPasswordInput){
            setUserPasswordErrorStatus({text : 'Password should not be empty', status: true});
            return false;
        }
        else{
            resetUserPasswordErrorStatus();

        }
        return true;
    }

    //--------------------------------------Login Checkbox----------------------------------------------
    const[loginCheckboxOptions, setLoginCheckboxOptions] = useState(() => [
        {
            text: 'Remember Me',
            isSelected: false
        }
    ]);

    const loginCheckboxOptionsHandler = (updatedLoginOptions)=>{
        setLoginCheckboxOptions(() => updatedLoginOptions);
    }


    //---------------------------------------------------------------------------------------------------
    const preSubmissionCheck = () => {
        isUsernameInputValid();
        isUserPasswordInputValid();
    }

    const loginFormSubmit = () => {
        preSubmissionCheck();
    }

    const LoginForm = (
        <div className='login-form-main-div'>
            <h3>Login</h3>
            <TextInput round  type={'text'} placeholder={'Username or Email Id'} onChange={usernameInputHandler} onFocus={resetUsernameErrorStatus} subLabelMessage={usernameErrorStatus.text} errorMark={usernameErrorStatus.status}></TextInput>
            <PasswordInput round placeholder={'Password'} onChange={userPasswordInputHandler} onFocus={resetUserPasswordErrorStatus} subLabelMessage={userPasswordErrorStatus.text} errorMark={userPasswordErrorStatus.status}></PasswordInput>
            <CheckboxGroup optionsList={loginCheckboxOptions} onChange={loginCheckboxOptionsHandler}></CheckboxGroup>
            <DefaultButton wide round outlined primary onClick={loginFormSubmit}>Login</DefaultButton>
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
