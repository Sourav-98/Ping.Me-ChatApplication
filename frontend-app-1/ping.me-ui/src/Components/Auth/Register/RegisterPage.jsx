
import { useState, useEffect } from 'react';

import warningMessages from './../AuthWarningMessages';
import AuthPageTemplate from "Components/Auth/templates/AuthPage.template";
import './RegisterPage.css';


import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';
import { CheckboxGroup } from 'elements/Input/CheckboxGroup/CheckboxGroup';
import { DefaultButton } from 'elements/Button/DefaultButton/DefaultButton';
import { IoEllipseSharp } from 'react-icons/io5';

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
        if(!userFirstName){
            setUserFirstNameErrorStatus({ text: warningMessages.FIRST_NAME_EMPTY, status: true});
            return false;
        }
        else{
            let firstNameRegex = /^[a-zA-Z]+$/;  // Match a valid first name only
            if(!firstNameRegex.test(userFirstName)){
                setUserFirstNameErrorStatus({ text: warningMessages.FIRST_NAME_INVALID, status: true});
                return false;
            }
            else{
                resetUserFirstNameErrorStatus();
            }
        }
        return true;
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
        if(!userLastName){
            setUserLastNameErrorStatus({ text: warningMessages.LAST_NAME_EMPTY, status: true});
            return false;
        }
        else{
            let lastNameRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/; // Match a valid last name only
            if(!lastNameRegex.test(userLastName)){
                setUserLastNameErrorStatus({ text: warningMessages.LAST_NAME_INVALID, status: true});
                return false;
            }
            else{
                resetUserLastNameErrorStatus();
            }
        }
        return true;
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
        if(!userPassword){
            setUserPasswordErrorStatus({ text: warningMessages.PASSWORD_EMPTY, status: true });
            return false;
        }
        else{
            resetUserPasswordErrorStatus();
        }
        return true;
    }

    //---------------------------------------CONFIRM PASSWORD--------------------------------------
    const [userConfirmPassword, setUserConfirmPassword] = useState(() => undefined);
    const [userConfirmPasswordErrorStatus, setUserConfirmPasswordErrorStatus] = useState({ text: undefined, status: false });

    const userConfirmPasswordInputHandler = (event) => {
        setUserConfirmPassword(() => event.target.value);
    }

    const resetUserConfirmPasswordErrorStatus = () => {
        setUserConfirmPasswordErrorStatus({ text: undefined, status: false });
    }

    const isUserConfirmPasswordValid = () => {
        if(!userConfirmPassword){
            setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_EMPTY, status: true});
            return false;
        }
        else{
            if(userConfirmPassword !== userPassword){
                setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_INVALID, status: true});
                return false;
            }
            else{
                resetUserConfirmPasswordErrorStatus();
            }
        }
        return true;
    }

    const userConfirmPasswordChecker = () => {
        if(!userConfirmPassword){
            resetUserConfirmPasswordErrorStatus();
            return;
        }
        if(userPassword !== userConfirmPassword){
            setUserConfirmPasswordErrorStatus({ text: warningMessages.CONFIRM_PASSWORD_INVALID, status: true });
        }
        else{
            resetUserConfirmPasswordErrorStatus();
        }
    }

    // after effect to check for the same user password and confirm password
    useEffect(() => {
        userConfirmPasswordChecker();
    }, [userConfirmPassword, userPassword]);



    //---------------------------------------------------------------------------------------------

    //-----------------------------------------REGISTER CHECKBOX-----------------------------------
    const[registerCheckboxOptions, setRegisterCheckboxOptions] = useState(() => [
        {
            text: 'Agree with the Terms and Conditions',
            isSelected: false,
            required: true
        },
        {
            text: 'Subscrible to Email Notifications',
            isSelected: false,
        },
    ]);

    const registerCheckboxOptionsHandler = (updatedRegisterOptions)=>{
        setRegisterCheckboxOptions(() => updatedRegisterOptions);
    }

    const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(() => true);

    useEffect(() => {
        setIsRegisterButtonDisabled(!registerCheckboxOptions[0].isSelected);    // enable the register button only when the TnC checkbox is selected
    }, [registerCheckboxOptions]);


    useEffect(() => {
        resetUserFirstNameErrorStatus();
        resetUserLastNameErrorStatus();
    }, []);

    const getUrlEncoded = (formData) => {
        let formBody = [];
        for(let element in formData){
            let key = encodeURIComponent(element);
            let value = encodeURIComponent(formData[element]);
            formBody.push(key + "=" + value);
        }
        formBody = formBody.join('&');
        return formBody;
    }

    const formSubmit = async(url, formBody) => {
            let response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: formBody
            });
            console.log(await response.json());
    }

    const onRegisterSubmit = () => {
        let firstNameValid = isUserFirstNameValid();
        let lastNameValid = isUserLastNameValid();
        let emailIdValid = isUserEmailIdValid();
        let passwordValid = isUserPasswordValid();
        let confirmPasswordValid = isUserConfirmPasswordValid();
        if(firstNameValid && lastNameValid && emailIdValid && passwordValid && confirmPasswordValid){
            let registerFormBody = getUrlEncoded({ firstName: userFirstName, lastName: userLastName, emailId: userEmailId, password: userPassword });
            console.log(registerFormBody);
            formSubmit("/register", registerFormBody);
        }
    }

    const RegisterForm = (
        <div className="register-form-main-div">
            <TextInput type={'text'} round placeholder={'First Name'} onChange={userFirstNameInputHandler} onFocus={resetUserFirstNameErrorStatus} onBlur={isUserFirstNameValid} subLabelMessage={userFirstNameErrorStatus.text} errorMark={userFirstNameErrorStatus.status}/>
            <TextInput type={'text'} round placeholder={'Last Name'} onChange={userLastNameInputHandler} onFocus={resetUserLastNameErrorStatus} onBlur={isUserLastNameValid} subLabelMessage={userLastNameErrorStatus.text} errorMark={userLastNameErrorStatus.status}/>
            <TextInput type={'email'} round placeholder={'Email Id'} onChange={userEmailIdInputHandler} onFocus={resetUserEmailIdErrorStatus} onBlur={isUserEmailIdValid} subLabelMessage={userEmailIdErrorStatus.text} errorMark={userEmailIdErrorStatus.status}/>
            <PasswordInput round placeholder={'Password'} onChange={userPasswordInputHandler} onFocus={resetUserPasswordErrorStatus} onBlur={isUserPasswordValid} subLabelMessage={userPasswordErrorStatus.text} errorMark={userPasswordErrorStatus.status}/>
            <PasswordInput round placeholder={'Confirm Password'} onChange={userConfirmPasswordInputHandler} onBlur={isUserConfirmPasswordValid} subLabelMessage={userConfirmPasswordErrorStatus.text} errorMark={userConfirmPasswordErrorStatus.status}/>
            <CheckboxGroup optionsList={registerCheckboxOptions} onChange={registerCheckboxOptionsHandler}></CheckboxGroup>
            <DefaultButton round primary wide disabled={isRegisterButtonDisabled} onClick={onRegisterSubmit}>Register</DefaultButton>
        </div>
    )

    return(
        <AuthPageTemplate AuthForm={RegisterForm}></AuthPageTemplate>
    )
}
