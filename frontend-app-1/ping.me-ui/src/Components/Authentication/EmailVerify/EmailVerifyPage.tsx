
import React, { useState, useEffect } from 'react';
import './EmailVerifyPage.css';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ResponseEnums } from 'Services/Utilities/ResponseEnums';

import AuthPageTemplate from '../templates/AuthPage.template';
import { useParams } from 'react-router';

import * as AuthService from 'Services/AuthServices/Auth.service';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import { SemiSpinner } from 'UI/PreLoaders';

const EmailVerifyPage : React.FC = () => {

    // isEmailVerified is assigned with 4 states -> VERIFIED, VERIFYING, INVALID_TOKEN, EXPIRED_TOKEN, NOT_VERIFIED
    // VERIFYING is the initial state of the page
    const [isEmailVerified, setEmailVerified] = useState<string>(() => 'VERIFYING');

    const { tokenStringEncrypted }  = useParams<string>();

    const emailVerifySubmit = async(token : string | undefined) => {
        let response = await AuthService.emailVerifySubmit(token);
        switch(response.status_code){
            case ResponseEnums.USER_EMAIL_ID_VERIFICATION_SUCCESS.status_code :
                setEmailVerified(() => 'VERIFIED');
                break;
            case ResponseEnums.USER_EMAIL_ID_VERIFICATION_FAIL_INVALID_TOKEN.status_code :
                setEmailVerified(() => 'INVALID_TOKEN')
                break;
            case ResponseEnums.USER_EMAIL_ID_VERIFICATION_FAIL_EXPIRED_TOKEN.status_code :
                setEmailVerified(() => 'EXPIRED_TOKEN');
                break;
            case ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS.status_code :
                setEmailVerified(() => 'NOT_VERIFIED');
                break;
            case ResponseEnums.USER_EMAIL_ID_VERIFICATION_FAIL_CLIENT_ERR.status_code :
                setEmailVerified(() => 'NOT_VERIFIED');
                break;
            case ResponseEnums.SERVER_ERR.status_code :
                setEmailVerified(() => 'NOT_VERIFIED');
                break;
        }
        console.log(response);
    }

    // on first load -> 
    useEffect(() => {
        console.log(tokenStringEncrypted);
        emailVerifySubmit(tokenStringEncrypted);
    }, []);

    const emailVerifying = (
        <div>
            <SemiSpinner lg></SemiSpinner>
            <p>
                Verifying...
            </p>
        </div>
    );

    const emailVerifySuccess = (
        <div>
            <span className="email-verify-status-logo success"><BsFillCheckCircleFill></BsFillCheckCircleFill></span>
            <h4>Email ID Verified!</h4>
            <a href="/login">Proceed to Login</a>
        </div>
    );

    const emailVerifyFailedInvalidToken = (
        <div>
            <span className="email-verify-status-logo danger"><IoMdCloseCircle></IoMdCloseCircle></span>
            <h4>Verification Failed - Invalid Token</h4>
            <a href="#">Send Email Verification Link again?</a>
        </div>
    );

    const emailVerifyForm = (
        <div className="email-verify-container-wrapper">
            {
                {
                    'VERIFYING' : emailVerifying,
                    'VERIFIED' : emailVerifySuccess,
                    'NOT_VERIFIED' : <></>,
                    'INVALID_TOKEN' : emailVerifyFailedInvalidToken,
                    'EXPIRED_TOKEN' : <></>
                }[isEmailVerified]
            }
        </div>
    )

    return (
        <AuthPageTemplate>
            {emailVerifyForm}
        </AuthPageTemplate>
    )
}

export default EmailVerifyPage;
