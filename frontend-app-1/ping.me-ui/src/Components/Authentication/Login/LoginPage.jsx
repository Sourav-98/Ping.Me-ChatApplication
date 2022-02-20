
import { useState, useContext } from 'react';

import AuthPageTemplate from '../templates/AuthPage.template';

import AppContext from 'Context/AppContext';

import { ResponseEnums } from 'Services/Utilities/ResponseEnums';

import * as AuthUtilities from './../AuthUtils/AuthUtilities';
import { AuthWarningConstants as warningMessages } from '../AuthUtils/AuthWarningMessages';
import * as AuthServices from 'Services/AuthServices/Auth.service';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput1 , PasswordInput1, CheckboxGroupInput } from 'Components/Elements/Input';
import { DefaultButton } from 'Components/Elements/Button';
import { SemiSpinner } from 'Components/Elements/PreLoaders';

import './LoginPage.css';

export default function LoginPage({breakpoints, windowWidth, ...props}){

    //---------------------Alert Context setup------------------------

    const appContext = useContext(AppContext);

    //--------------------------------------Username-------------------------------------------------------
    const [userEmailId, setUserEmailId] = useState(() => undefined);
    const [userEmailIdErrorStatus, setUserEmailIdErrorStatus] = useState({ text: undefined, status: false });

    const userEmailIdInputHandler = (event) => {
        setUserEmailId(() => event.target.value);
    }

    const resetUserEmailIdErrorStatus = () => {
        setUserEmailIdErrorStatus({ text: undefined, status: false });
    }

    const isUserEmailIdValid = () => {
        let checkResult = AuthUtilities.isUserEmailIdValid(userEmailId);
        switch(checkResult){
            case 0: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_EMPTY, status: true}); return false;
            case -1: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_INVALID, status: true}); return false;
            case 1: resetUserEmailIdErrorStatus(); return true;
            default: return true;
        }
    }

    //--------------------------------------Password-------------------------------------------------------
    const [userPassword, setUserPassword] = useState(() => undefined);
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState({text : undefined, status : false});

    const userPasswordInputHandler = (event) => {
        setUserPassword(() => event.target.value)
    }

    const resetUserPasswordErrorStatus = () => {
        setUserPasswordErrorStatus({text : undefined, status: false});
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

    const clearAllSubLabelMessages = () => {
        resetUserEmailIdErrorStatus();
        resetUserPasswordErrorStatus();
    }

    const loginFormSubmit = async() => {
        if(!loginFormSubmitLock){
            if(preSubmissionCheck()){
                clearAllSubLabelMessages();
                setLoginFormSubmitLock(() => true);
                let loginFormData = { emailId: userEmailId, password: userPassword };
                let response = await AuthServices.loginFormSubmit(loginFormData);
                switch(response.status_code){
                    case ResponseEnums.LOGIN_SUCCESS.status_code: 
                        console.log(response.status_message);
                        appContext.pushAlert({message: 'Login Successful!', type: 'success'});
                        break;
                    case ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID.status_code: 
                        setUserEmailIdErrorStatus({ text: warningMessages.EMAIL_ID_INCORRECT, status: true});
                        break;
                    case ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD.status_code: 
                        setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_INCORRECT, status: true});
                        break;
                    case ResponseEnums.LOGIN_FAIL_OTHER.status_code: 
                        appContext.pushAlert({message : 'Invalid Login Request made!', template: 'outlined', type: 'warning'});
                        break;
                    case ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS.status_code:
                        appContext.pushAlert({message : 'Bad Request was made!', template: 'outlined', type: 'danger'});
                        break;
                    case ResponseEnums.SERVER_ERR.status_code:
                        appContext.pushAlert({message: 'Server-side error! Please try after some time.', type: 'danger', autoClose: false});
                        break;
                    case ResponseEnums.SERVER_CONN_ERR.status_code:
                        appContext.pushAlert({message: 'Error communicating with the server.', type: 'danger', autoClose: false});
                        break;
                    case 555555: 
                    default: appContext.pushAlert({message: 'Unknown error occured', type: 'warning'}); break;
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
            <TextInput1 round type={'text'} placeholder={'Email Id'} onChange={userEmailIdInputHandler} onFocus={resetUserEmailIdErrorStatus} onBlur={isUserEmailIdValid} subLabelMessage={userEmailIdErrorStatus.text} errorMark={userEmailIdErrorStatus.status}></TextInput1>
            <PasswordInput1 round placeholder={'Password'} onChange={userPasswordInputHandler} onFocus={resetUserPasswordErrorStatus} onBlur={isUserPasswordInputValid} subLabelMessage={userPasswordErrorStatus.text} errorMark={userPasswordErrorStatus.status}></PasswordInput1>
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
