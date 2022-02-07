
import { useState, useContext } from 'react';

import AuthPageTemplate from '../templates/AuthPage.template';

import AlertContext from 'Components/Utilities/AlertContext';

import * as AuthUtilities from './../AuthUtils/AuthUtilities';
import { AuthWarningConstants as warningMessages } from '../AuthUtils/AuthWarningMessages';
import * as AuthServices from 'Services/AuthServices/Auth.service';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput, PasswordInput, CheckboxGroupInput } from 'Components/Elements/Input';
import { DefaultButton } from 'Components/Elements/Button';
import { SemiSpinner } from 'Components/Elements/PreLoaders';

import './LoginPage.css';

export default function LoginPage({breakpoints, windowWidth, ...props}){

    //---------------------Alert Context setup------------------------

    const alertContext = useContext(AlertContext);

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
        let checkResult = AuthUtilities.isUserEmailIdValid(userEmailId);
        switch(checkResult){
            case 0: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_EMPTY, status: true}); return false;
            case -1: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_INVALID, status: true}); return false;
            case 1: return true;
            default: return true;
        }
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
        let checkResult = AuthUtilities.isPasswordValid(userPassword);
        switch(checkResult){
            case 0: setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_EMPTY, status: true }); return false;
            case -1: return false;
            case 1: resetUserPasswordErrorStatus(); return true;
            default: return true;
        }
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

    //-------------------------------------FORM SUBMIT HANDLER------------------------------------------

    const [loginFormSubmitLock, setLoginFormSubmitLock] = useState(() => false);

    const preSubmissionCheck = () => {
        let emailIdValid = isUserEmailIdValid();
        let passwordValid = isUserPasswordInputValid();
        if(!emailIdValid || !passwordValid){
            return false;
        }
        return true;
    }

    const loginFormSubmit = async() => {
        if(!loginFormSubmitLock){
            if(preSubmissionCheck()){
                setLoginFormSubmitLock(() => true);
                let loginFormData = { emailId: userEmailId, password: userPassword };
                let response = await AuthServices.loginFormSubmit(loginFormData);
                switch(response.status_code){
                    case 102000: console.log(response.status_message); break;
                    case 102101: setUserEmailIdErrorStatus({ text: warningMessages.EMAIL_ID_INCORRECT, status: true}); break;
                    case 102121: setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_INCORRECT, status: true}); break;
                    default: console.log(response.status_message); break;
                }
                setTimeout(() => {
                    setLoginFormSubmitLock(() => false);
                }, 500);
            }
        }
    }

    

    const LoginForm = (
        <div className='login-form-main-div'>
            <h3>Login</h3>
            <TextInput round type={'text'} placeholder={'Email Id'} onChange={userEmailIdInputHandler} onFocus={resetUserEmailIdErrorStatus} subLabelMessage={userEmailIdErrorStatus.text} errorMark={userEmailIdErrorStatus.status}></TextInput>
            <PasswordInput round placeholder={'Password'} onChange={userPasswordInputHandler} onFocus={resetUserPasswordErrorStatus} subLabelMessage={userPasswordErrorStatus.text} errorMark={userPasswordErrorStatus.status}></PasswordInput>
            <CheckboxGroupInput optionsList={loginCheckboxOptions} onChange={loginCheckboxOptionsHandler}></CheckboxGroupInput>
            <DefaultButton wide round primary onClick={loginFormSubmit}>{ loginFormSubmitLock ? <SemiSpinner light></SemiSpinner> : `Login`}</DefaultButton>
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
        <AuthPageTemplate>{LoginForm}</AuthPageTemplate>
    )
}
