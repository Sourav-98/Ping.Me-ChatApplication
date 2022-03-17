
import React, { useState, useEffect, useContext } from 'react';

import * as AuthServices from 'Services/AuthServices/Auth.service';
import * as AuthUtilities from './../AuthUtils/AuthUtilities';
import { AuthWarningConstants as warningMessages } from '../AuthUtils/AuthWarningMessages';
import { ResponseEnums } from 'Services/Utilities/ResponseEnums';
import AuthPageTemplate from "./../templates/AuthPage.template";
import './RegisterPage.css';

import { TextInput1 as TextInput, PasswordInput1 as PasswordInput, CheckboxGroupInput, CheckboxOptionType } from 'UI/Input';
import { DefaultButton } from 'UI/Button';
import { SemiSpinner } from 'UI/PreLoaders';

import AlertsContext from 'Context/AlertsContext/AlertsContext';

export default function RegisterPage(){

    const appContext = useContext(AlertsContext);

    type SubLabelContent = {
        text : string | undefined,
        status : boolean
    }

    //-----------------------------------------FIRST NAME-------------------------------------------
    const [userFirstName, setUserFirstName] = useState<string>(() => '')
    const [userFirstNameErrorStatus, setUserFirstNameErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userFirstNameInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(event.target.value);
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
    const [userLastName, setUserLastName] = useState<string>(() => '')
    const [userLastNameErrorStatus, setUserLastNameErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userLastNameInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
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
    const [userEmailId, setUserEmailId] = useState<string>(() => '')
    const [userEmailIdErrorStatus, setUserEmailIdErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userEmailIdInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
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
    const [userPassword, setUserPassword] = useState<string>(() => '')
    const [userPasswordErrorStatus, setUserPasswordErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userPasswordInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
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
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>(() => '');
    const [userConfirmPasswordErrorStatus, setUserConfirmPasswordErrorStatus] = useState<SubLabelContent>({ text: undefined, status: false });

    const userConfirmPasswordInputHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserConfirmPassword(() => event.target.value);
    }

    const resetUserConfirmPasswordErrorStatus = (text ?: string) => {
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
    const[registerCheckboxOptions, setRegisterCheckboxOptions] = useState<Array<CheckboxOptionType>>(() => [
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

    const registerCheckboxOptionsHandler = (updatedRegisterOptions : Array<CheckboxOptionType>)=>{
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

    const clearAllSubLabelMessages = () => {
        resetUserFirstNameErrorStatus();
        resetUserLastNameErrorStatus();
        resetUserEmailIdErrorStatus();
        resetUserPasswordErrorStatus();
    }

    const onRegisterSubmit = async() => {
        if(!registerFormSubmitLock){
            if(preSubmissionCheck()){
                clearAllSubLabelMessages();
                setRegisterFormSubmitLock(true);
                let registerFormData = { firstName: userFirstName, lastName: userLastName, emailId: userEmailId, password: userPassword };
                let res = await AuthServices.registerFormSubmit(registerFormData);
                switch(res.status_code){
                    case ResponseEnums.REGISETER_SUCCESS.status_code: appContext.pushAlert({ message: res.status_message, type: 'success', autoClose: false}); break;
                    case ResponseEnums.REGISTER_FAIL_EMAIL_ID_TAKEN.status_code: appContext.pushAlert({ message: 'Registration Failed', type: 'danger'}); setUserEmailIdErrorStatus({ text : warningMessages.EMAIL_ID_EXISTS, status: true }); break;
                    case ResponseEnums.REGISTER_FAIL_INVALID_EMAIL_ID.status_code: break;
                    case ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS.status_code: appContext.pushAlert({message : 'Bad Request was made!', template: 'outlined', type: 'danger'}); break;
                    case ResponseEnums.SERVER_ERR.status_code: appContext.pushAlert({message: 'Server-side error! Please try after some time.', type: 'danger'}); break;
                    case ResponseEnums.SERVER_CONN_ERR.status_code: appContext.pushAlert({message: 'Error communicating with the server.', type: 'danger'}); break;
                    case ResponseEnums.ANNONYMOUS_ERR.status_code: 
                    default: appContext.pushAlert({message: 'Unknown error occured', type: 'warning'}); break;
                }
                setTimeout(() => {
                    setRegisterFormSubmitLock(false);
                }, 300)
            }
        }
    }

    const newPrimaryAlert = () => {
        appContext.pushAlert({message: 'A Dummy Primary Alert!', autoClose: false});
    }
    const newSecondaryAlert = () => {
        appContext.pushAlert({message: 'A Dummy Secondary Alert!', type: 'secondary'});
    }
    const newSuccessAlert = () => {
        appContext.pushAlert({message: 'A Dummy Success Alert!', type: 'success'});
    }
    const newDangerAlert = () => {
        appContext.pushAlert({message: 'A Dummy Danger Alert', type: 'danger'});
    }
    const newWarningAlert = () => {
        appContext.pushAlert({message: 'A Dummy Warning Alert', type: 'warning'});
    }

    const newOutlinedPrimaryAlert = () => {
        appContext.pushAlert({message: 'A Dummy Primary Alert', template: 'outlined'});
    }
    const newOutlinedSecondaryAlert = () => {
        appContext.pushAlert({message: 'A Dummy Secondary Alert', template: 'outlined', type: 'secondary'});
    }
    const newOutlinedSuccessAlert = () => {
        appContext.pushAlert({message: 'A Dummy Success Alert', template: 'outlined', type: 'success'});
    }
    const newOutlinedDangerAlert = () => {
        appContext.pushAlert({message: 'A Dummy Danger Alert', template: 'outlined', type: 'danger'});
    }
    const newOutlinedWarningAlert = () => {
        appContext.pushAlert({message: 'A Dummy Warning Alert', template: 'outlined', type: 'warning'});
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
            <br/>
            <div className="alert-popup-buttons-list">
                <DefaultButton sm round  outlined onClick={newOutlinedPrimaryAlert}>Alert</DefaultButton>
                <DefaultButton round secondary outlined sm onClick={newOutlinedSecondaryAlert}>Alert</DefaultButton>
                <DefaultButton round success outlined sm onClick={newOutlinedSuccessAlert}>Alert</DefaultButton>
                <DefaultButton round danger outlined sm onClick={newOutlinedDangerAlert}>Alert</DefaultButton>
                <DefaultButton round warning outlined sm onClick={newOutlinedWarningAlert}>Alert</DefaultButton>
            </div>
            <br/>
            <div className="alert-popup-buttons-list">
                <DefaultButton  round onClick={newPrimaryAlert}>Alert</DefaultButton>
                <DefaultButton round secondary  onClick={newSecondaryAlert}>Alert</DefaultButton>
                <DefaultButton round success  onClick={newSuccessAlert}>Alert</DefaultButton>
                <DefaultButton round danger  onClick={newDangerAlert}>Alert</DefaultButton>
                <DefaultButton round warning  onClick={newWarningAlert}>Alert</DefaultButton>
            </div>
            <br/>
            <div className="alert-popup-buttons-list">
                <DefaultButton lg round primary onClick={newPrimaryAlert}>Alert</DefaultButton>
                <DefaultButton lg round secondary  onClick={newSecondaryAlert}>Alert</DefaultButton>
                <DefaultButton lg round success onClick={newSuccessAlert}>Alert</DefaultButton>
                <DefaultButton lg round danger  onClick={newDangerAlert}>Alert</DefaultButton>
                <DefaultButton lg round warning onClick={newWarningAlert}>Alert</DefaultButton>
            </div>
        </div>
    )

    return(
        <AuthPageTemplate>{RegisterForm}</AuthPageTemplate>
    )
}
