
import { useState, useEffect } from 'react';

import * as AuthServices from 'Services/AuthServices/Auth.service';
import * as AuthUtilities from './../AuthUtils/AuthUtilities';
import { AuthWarningConstants as warningMessages } from '../AuthUtils/AuthWarningMessages';
import AuthPageTemplate from "Components/Authentication/templates/AuthPage.template";
import './RegisterPage.css';

import { TextInput, PasswordInput, CheckboxGroupInput } from 'Components/Elements/Input';
import { Alert } from 'Components/Elements/Notifications';
import { DefaultButton } from 'Components/Elements/Button';
import { SemiSpinner } from 'Components/Elements/PreLoaders';

export default function RegisterPage(){

    //-----------------------------------------FIRST NAME-------------------------------------------
    const [userFirstName, setUserFirstName] = useState(() => undefined);
    const [userFirstNameErrorStatus, setUserFirstNameErrorStatus] = useState({ text: undefined, status: false });

    const userFirstNameInputHandler = (event) => {
        setUserFirstName(() => event.target.value);
    }

    const resetUserFirstNameErrorStatus = () => {
        setUserFirstNameErrorStatus({ text: undefined, status: false });
    }

    const isUserFirstNameValid = () => {
        let checkResult = AuthUtilities.isFirstNameValid(userFirstName);
        switch(checkResult){
            case 0: setUserFirstNameErrorStatus({ text: warningMessages.FIRST_NAME_EMPTY, status: true}); return false;
            case -1: setUserFirstNameErrorStatus({ text: warningMessages.FIRST_NAME_INVALID, status: true}); return false;
            case 1: resetUserFirstNameErrorStatus(); return true;
            default: return true;
        }
    }

    //-----------------------------------------LAST NAME---------------------------------------------
    const [userLastName, setUserLastName] = useState(() => undefined);
    const [userLastNameErrorStatus, setUserLastNameErrorStatus] = useState({ text: undefined, status: false });

    const userLastNameInputHandler = (event) => {
        setUserLastName(() => event.target.value);
    }

    const resetUserLastNameErrorStatus = () => {
        setUserLastNameErrorStatus({ text: undefined, status: false });
    }

    const isUserLastNameValid = () => {
        let checkResult = AuthUtilities.isLastNameValid(userLastName);
        switch(checkResult){
            case 0: setUserLastNameErrorStatus({ text: warningMessages.LAST_NAME_EMPTY, status: true}); return false;
            case -1: setUserLastNameErrorStatus({ text: warningMessages.LAST_NAME_INVALID, status: true}); return false;
            case 1: resetUserLastNameErrorStatus(); return true;
            default: return true;
        }
    }

    //----------------------------------------EMAIL ID--------------------------------------------
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
            case 1: return true;
            default: return true;
        }
    }

    //--------------------------------------PASSWORD----------------------------------------------
    const [userPassword, setUserPassword] = useState(() => undefined);
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState({ text: undefined, status: false });

    const userPasswordInputHandler = (event) => {
        setUserPassword(() => event.target.value);
    }

    const resetUserPasswordErrorStatus = () => {
        setUserPasswordErrorStatus({ text: undefined, status: false });
    }

    const isUserPasswordValid = () => {
        let checkResult = AuthUtilities.isPasswordValid(userPassword);
        switch(checkResult){
            case 0: setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_EMPTY, status: true }); return false;
            case -1: return false;
            case 1: resetUserPasswordErrorStatus(); return true;
            default: return true;
        }
    }

    //---------------------------------------CONFIRM PASSWORD--------------------------------------
    const [userConfirmPassword, setUserConfirmPassword] = useState(() => undefined);
    const [userConfirmPasswordErrorStatus, setUserConfirmPasswordErrorStatus] = useState({ text: undefined, status: false });

    const userConfirmPasswordInputHandler = (event) => {
        setUserConfirmPassword(() => event.target.value);
    }

    const resetUserConfirmPasswordErrorStatus = (text = undefined) => {
        setUserConfirmPasswordErrorStatus({ text: text, status: false });
    }

    const isUserConfirmPasswordValid = () => {
        let checkResult = AuthUtilities.isConfirmPasswordValid(userConfirmPassword, userPassword);
        switch(checkResult){
            case 0: setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_EMPTY, status: true}); return false;
            case -1: setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_INVALID, status: true}); return false;
            case 1: resetUserConfirmPasswordErrorStatus(warningMessages.CONFIRM_PASSWORD_VALID); return true;
            default: return true;
        }
    }

    const userConfirmPasswordChecker = () => {
        let checkResult = AuthUtilities.isConfirmPasswordValid(userConfirmPassword, userPassword);
        switch(checkResult){
            case 0: resetUserConfirmPasswordErrorStatus(); return;
            case -1: setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_INVALID, status: true }); return;
            case 1: resetUserConfirmPasswordErrorStatus(warningMessages.CONFIRM_PASSWORD_VALID); return;
            default: return;
        }
    }

    // after effect to check for the same user password and confirm password
    useEffect(() => {
        userConfirmPasswordChecker();
    }, [userConfirmPassword, userPassword]);


    //--------------------------------------REGISTER CHECKBOX--------------------------------------
    const[registerCheckboxOptions, setRegisterCheckboxOptions] = useState(() => [
        {
            text: 'Agree with the Terms and Conditions',
            isSelected: false,
            required: true
        },
        {
            text: 'Subscrible to Email Notifications',
            isSelected: false,
        }
    ]);

    const registerCheckboxOptionsHandler = (updatedRegisterOptions)=>{
        setRegisterCheckboxOptions(() => updatedRegisterOptions);
    }

    const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(() => true);

    useEffect(() => {
        setIsRegisterButtonDisabled(!registerCheckboxOptions[0].isSelected);    // enable the register button only when the TnC checkbox is selected
    }, [registerCheckboxOptions]);


    //-------------------------------FORM SUBMIT HANDLER------------------------------
    const [registerFormSubmitLock, setRegisterFormSubmitLock] = useState(() => false);

    const preSubmissionCheck = ()=>{
        let firstNameValid = isUserFirstNameValid();
        let lastNameValid = isUserLastNameValid();
        let emailIdValid = isUserEmailIdValid();
        let passwordValid = isUserPasswordValid();
        let confirmPasswordValid = isUserConfirmPasswordValid();
        if(!firstNameValid || !lastNameValid || !emailIdValid || !passwordValid || !confirmPasswordValid){
            return false;
        }
        return true;
    }

    const onRegisterSubmit = async() => {
        if(!registerFormSubmitLock){
            if(preSubmissionCheck()){
                setRegisterFormSubmitLock(true);
                let registerFormData = { firstName: userFirstName, lastName: userLastName, emailId: userEmailId, password: userPassword };
                let res = await AuthServices.registerFormSubmit(registerFormData);
                switch(res.status_code){
                    case 202100: break;
                    case 202101: setUserEmailIdErrorStatus({ text : warningMessages.EMAIL_ID_EXISTS, status: true }); break;
                    case 202111: break;
                    case 999999: break;
                    default: break;
                }
                setTimeout(() => {
                    setRegisterFormSubmitLock(false);
                }, 300)
            }
        }
    }

    const [isAlertVisible, setIsAlertVisible] = useState(() => false);

    const alertClose = () => {
        setIsAlertVisible(() => false);
    }

    const toggleShowAlert = () => {
        setIsAlertVisible((isVisible) => !isVisible);
    }

    const RegisterForm = (
        <div className="register-form-main-div">
            <TextInput type={'text'} round placeholder={'First Name'} onChange={userFirstNameInputHandler} onFocus={resetUserFirstNameErrorStatus} onBlur={isUserFirstNameValid} subLabelMessage={userFirstNameErrorStatus.text} errorMark={userFirstNameErrorStatus.status}/>
            <TextInput type={'text'} round placeholder={'Last Name'} onChange={userLastNameInputHandler} onFocus={resetUserLastNameErrorStatus} onBlur={isUserLastNameValid} subLabelMessage={userLastNameErrorStatus.text} errorMark={userLastNameErrorStatus.status}/>
            <TextInput type={'email'} round placeholder={'Email Id'} onChange={userEmailIdInputHandler} onFocus={resetUserEmailIdErrorStatus} onBlur={isUserEmailIdValid} subLabelMessage={userEmailIdErrorStatus.text} errorMark={userEmailIdErrorStatus.status}/>
            <PasswordInput round placeholder={'Password'} onChange={userPasswordInputHandler} onFocus={resetUserPasswordErrorStatus} onBlur={isUserPasswordValid} subLabelMessage={userPasswordErrorStatus.text} errorMark={userPasswordErrorStatus.status}/>
            <PasswordInput round placeholder={'Confirm Password'} onChange={userConfirmPasswordInputHandler} onBlur={isUserConfirmPasswordValid} subLabelMessage={userConfirmPasswordErrorStatus.text} errorMark={userConfirmPasswordErrorStatus.status}/>
            <CheckboxGroupInput optionsList={registerCheckboxOptions} onChange={registerCheckboxOptionsHandler}></CheckboxGroupInput>
            <DefaultButton round primary wide disabled={isRegisterButtonDisabled} onMouseUp={onRegisterSubmit}>{ registerFormSubmitLock ? <SemiSpinner light></SemiSpinner> : 'Register'}</DefaultButton>
            <DefaultButton round primary outlined sm onClick={toggleShowAlert}>Show Alert</DefaultButton>
            <Alert isVisible={isAlertVisible} closeFunc={alertClose}></Alert>
        </div>
    )

    return(
        <AuthPageTemplate>{RegisterForm}</AuthPageTemplate>
    )
}
