
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import AuthPageTemplate from "Components/Auth/templates/AuthPage.template";
import './RegisterPage.css';

import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';

export default function RegisterPage(){

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    const togglePasswordVisibility = ()=>{
        setPasswordVisible(passwordVisible => !passwordVisible);
    };

    const togglePasswordConfirmVisibility = ()=>{
        setPasswordConfirmVisible(passwordConfirmVisible => !passwordConfirmVisible);
    };

    const RegisterForm = (
        <div className="register-form-main-div">
            <TextInput type={'text'} round placeholder={'First Name'}></TextInput>
            <TextInput type={'text'} round placeholder={'Last Name'}></TextInput>
            <TextInput type={'text'} round placeholder={'Date Of Birth'}></TextInput>
            <TextInput type={'email'} round placeholder={'Email Id'}></TextInput>
            <PasswordInput round placeholder={'Password'}></PasswordInput>
            <PasswordInput round placeholder={'Confirm Password'}></PasswordInput>
        </div>
    )

    return(
        <AuthPageTemplate AuthForm={RegisterForm}></AuthPageTemplate>
    )
}
