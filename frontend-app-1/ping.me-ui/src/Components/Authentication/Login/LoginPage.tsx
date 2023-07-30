
import React, { useState, useContext } from 'react';

import AlertContext from 'Context/AlertContext/AlertContext';

import { ResponseEnums } from 'Services/Utilities/ResponseEnums';

import * as AuthUtilities from '../AuthUtils/AuthUtilities';
import { AuthWarningConstants as warningMessages } from '../AuthUtils/AuthWarningMessages';
import * as AuthServices from 'Services/AuthServices/Auth.service';

import GoogleSvg from 'assets/google-color.svg';
import FacebookSvg from 'assets/facebook-color.svg';
import TwitterSvg from 'assets/twitter-color.svg';

import { TextInput1, PasswordInput1, CheckboxGroupInput, CheckboxOptionType } from 'UI/Input';
import { DefaultButton, DropDownButton } from 'UI/Button';
import { SemiSpinner } from 'UI/PreLoaders';


import './LoginPage.css';
import { Link } from 'react-router-dom';

export default function LoginPage({...props}){

    //---------------------Alert Context setup------------------------

    const alertContext = useContext(AlertContext);

    type SubLabelContent = {
        text : string | undefined,
        status : boolean
    }

    //--------------------------------------Username-------------------------------------------------------
    const [userEmailId, setUserEmailId] = useState<string>(() => '')
    const [userEmailIdErrorStatus, setUserEmailIdErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userEmailIdInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserEmailId(() => event.target.value);
    }

    const resetUserEmailIdErrorStatus = () => {
        setUserEmailIdErrorStatus({ text: undefined, status: false });
    }

    const isUserEmailIdValid = () : boolean => {
        let checkResult = AuthUtilities.isUserEmailIdValid(userEmailId);
        switch(checkResult){
            case 0: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_EMPTY, status: true}); return false;
            case -1: setUserEmailIdErrorStatus({text : warningMessages.EMAIL_ID_INVALID, status: true}); return false;
            case 1: resetUserEmailIdErrorStatus(); return true;
            default: return true;
        }
    }

    //--------------------------------------Password-------------------------------------------------------
    const [userPassword, setUserPassword] = useState<string>(() => '')
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState<SubLabelContent>({text : undefined, status : false});

    const userPasswordInputHandler : React.ChangeEventHandler<HTMLInputElement> = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(() => event.target.value)
    }

    const resetUserPasswordErrorStatus = () : void=> {
        setUserPasswordErrorStatus({text : undefined, status: false});
    }

    const isUserPasswordInputValid = () : boolean => {
        let checkResult = AuthUtilities.isPasswordValid(userPassword);
        switch(checkResult){
            case 0: setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_EMPTY, status: true }); return false;
            case -1: return false;
            case 1: resetUserPasswordErrorStatus(); return true;
            default: return true;
        }
    }

    //--------------------------------------Login Checkbox----------------------------------------------

    const[loginCheckboxOptions, setLoginCheckboxOptions] = useState<Array<CheckboxOptionType>>(() => [
        {
            text: 'Remember Me',
            isSelected : false
        }
    ]);

    const loginCheckboxOptionsHandler = (updatedLoginOptions : Array<CheckboxOptionType>)=>{
        setLoginCheckboxOptions(updatedLoginOptions);
    }

    //-------------------------------------FORM SUBMIT HANDLER------------------------------------------

    const [loginFormSubmitLock, setLoginFormSubmitLock] = useState<boolean>(() => false);

    const preSubmissionCheck = () : boolean => {
        let emailIdValid = isUserEmailIdValid();
        let passwordValid = isUserPasswordInputValid();
        if(!emailIdValid || !passwordValid){
            return false;
        }
        return true;
    }

    const clearAllSubLabelMessages = () : void => {
        resetUserEmailIdErrorStatus();
        resetUserPasswordErrorStatus();
    }

    const loginFormSubmit = async() : Promise<void> => {
        if(!loginFormSubmitLock){
            if(preSubmissionCheck()){
                clearAllSubLabelMessages();
                setLoginFormSubmitLock(() => true);
                let loginFormData = { emailId: userEmailId, password: userPassword };
                // alertContext.toggleBackdropOn();
                let response : { status_code : number, status_message : string} = await AuthServices.loginFormSubmit(loginFormData);
                switch(response.status_code){
                    case ResponseEnums.LOGIN_SUCCESS.status_code: 
                        console.log(response.status_message);
                        alertContext.pushAlert({message: 'Login Successful!', type: 'success'});
                        break;
                    case ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID.status_code: 
                        setUserEmailIdErrorStatus({ text: warningMessages.EMAIL_ID_INCORRECT, status : true});
                        break;
                    case ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD.status_code: 
                        setUserPasswordErrorStatus({text : warningMessages.PASSWORD_INCORRECT, status : true});
                        break;
                    case ResponseEnums.LOGIN_FAIL_USER_EMAIL_ID_NOT_VERIFIED.status_code : 
                        alertContext.pushAlert({message : 'Please verify your email account before login', type : 'danger'});
                        break;
                    case ResponseEnums.LOGIN_FAIL_OTHER.status_code: // this error would not arise because proper login form parameters are always sent by the application
                        alertContext.pushAlert({message : 'Invalid Login Request made', template : 'outlined', type : 'warning'});
                        break;
                    case ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS.status_code:
                        alertContext.pushAlert({message : 'Bad Request was made!', template: 'outlined', type: 'danger'});
                        break;
                    case ResponseEnums.SERVER_ERR.status_code:
                        alertContext.pushAlert({message : 'Server-side error! Please try after some time', type : 'danger', autoClose : false});
                        break;
                    case ResponseEnums.SERVER_CONN_ERR.status_code:
                        alertContext.pushAlert({message : 'Error communicating with the server', type : 'danger', autoClose : true, autoCloseDuration: 4000});
                        break;
                    case 555555: 
                    default: alertContext.pushAlert({message : 'Unknown error occured', type : 'warning'}); break;
                }
                alertContext.toggleBackdropOff();
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
            <DefaultButton aria-label={'login submit'} wide round primary onClick={loginFormSubmit}>{ loginFormSubmitLock ? <SemiSpinner light></SemiSpinner> : `Login`}</DefaultButton>
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
                    <Link to="../register">Sign Up</Link>
                </div>
            </div>
            <DropDownButton right dropDownElement={<>Helloworld123584234<br/>12392u392inksjndf</>}>Dropdown</DropDownButton>
        </div>
    );

    return LoginForm;
}
