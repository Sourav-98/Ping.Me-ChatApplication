
import { useState } from 'react';

import AuthPageTemplate from "Components/Auth/templates/AuthPage.template";
import './RegisterPage.css';

import { TextInput } from 'elements/Input/TextInput/TextInput';
import { PasswordInput } from 'elements/Input/PasswordInput/PasswordInput';
import { CheckboxGroup } from 'elements/Input/CheckboxGroup/CheckboxGroup';
import { DefaultButton } from 'elements/Button/DefaultButton/DefaultButton';

export default function RegisterPage(){

    const[registerSelectorOptions, setLoginSelectorOptions] = useState(() => [
        {
            text: 'Agree with the Terms and Conditions',
            isSelected: false
        },
        {
            text: 'Subscrible to Email Notifications',
            isSelected: false
        },
    ]);

    const registerSelectorOptionsHandler = (updatedLoginOptions)=>{
        setLoginSelectorOptions(() => updatedLoginOptions);
    }

    const RegisterForm = (
        <div className="register-form-main-div">
            <TextInput type={'text'} round placeholder={'First Name'}></TextInput>
            <TextInput type={'text'} round placeholder={'Last Name'}></TextInput>
            <TextInput type={'text'} round placeholder={'Date Of Birth'}></TextInput>
            <TextInput type={'email'} round placeholder={'Email Id'}></TextInput>
            <PasswordInput round placeholder={'Password'}></PasswordInput>
            <PasswordInput round placeholder={'Confirm Password'}></PasswordInput>
            <CheckboxGroup optionsList={registerSelectorOptions} onChange={registerSelectorOptionsHandler}></CheckboxGroup>
            <DefaultButton round primary text={'Register'}></DefaultButton>
        </div>
    )

    return(
        <AuthPageTemplate AuthForm={RegisterForm}></AuthPageTemplate>
    )
}
