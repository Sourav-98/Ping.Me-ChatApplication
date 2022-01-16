
import { useState } from 'react';

import AuthPageTemplate from '../templates/AuthPage.template';
import warningMessages from '../AuthWarningMessages';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';
import { DefaultButton } from 'elements/Button/DefaultButton/DefaultButton';
import { CheckboxGroup } from 'elements/Input/CheckboxGroup/CheckboxGroup';

import './LoginPage.css';
import { faLessThanEqual, faSleigh } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage({breakpoints, windowWidth, ...props}){

    //--------------------------------------Username-------------------------------------------------------
    const [userEmailId, setUserEmailId] = useState(() => undefined);
    const [userEmailIdErrorStatus, setUserEmailIdErrorStatus] = useState({ text: '', status: false });

    const userEmailIdInputHandler = (event) => {
        setUserEmailId(() => event.target.value);
    }

    const resetUserEmailIdErrorStatus = () => {
        setUserEmailIdErrorStatus({ text: '', status: false });
    }

    const isUserEmailIdValid = () => {
        if(!userEmailId){
            setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_EMPTY, status: true});
            return false;
        }
        else{
            // Email Regex
            let emailRegex = /[a-zA-Z0-9\._]+@[a-z]{3,10}\.[a-z]{2,5}/s;
            if(!emailRegex.test(userEmailId)){
                setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_INVALID, status: true});
                return false;
            }
            else{
                resetUserEmailIdErrorStatus();
            }
        }
        return true;
    }

    //--------------------------------------Password-------------------------------------------------------
    const [userPassword, setUserPassword] = useState(() => undefined);
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState({text : '', status : false});

    const userPasswordInputHandler = (event) => {
        setUserPassword(() => event.target.value)
    }

    const resetUserPasswordErrorStatus = () => {
        setUserPasswordErrorStatus({text : '', status: false});
    }

    const isUserPasswordInputValid = () => {
        if(!userPassword){
            setUserPasswordErrorStatus({text : warningMessages.PASSWORD_EMPTY, status: true});
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

    //----------------------------------BACKEND CALLS---------------------------------------------------

    async function getUrlEncoded(formData){
        let formBody = [];
        for(let element in formData){
            let key = encodeURIComponent(element);
            let value = encodeURIComponent(formData[element]);
            formBody.push(key + "=" + value);
        }
        formBody = formBody.join('&');
        return formBody;
    }


    //---------------------------------------------------------------------------------------------------
    const preSubmissionCheck = () => {
        let emailIdValid = isUserEmailIdValid();
        let passwordValid = isUserPasswordInputValid();
        if(!emailIdValid || !passwordValid){
            return false;
        }
        return true;
    }

    const loginFormSubmit = async() => {
        if(preSubmissionCheck()){
            let loginFormBody = await getUrlEncoded({ emailId: userEmailId, password: userPassword });
            let loginUrl = "http://localhost:5000/login";
            fetch(loginUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body: loginFormBody
            }).then(response => response.JSON)
            .then(response => {
                console.log(response);
            })
        }
    }

    

    const LoginForm = (
        <div className='login-form-main-div'>
            <h3>Login</h3>
            <TextInput round type={'text'} placeholder={'Email Id'} onChange={userEmailIdInputHandler} onFocus={resetUserEmailIdErrorStatus} subLabelMessage={userEmailIdErrorStatus.text} errorMark={userEmailIdErrorStatus.status}></TextInput>
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
