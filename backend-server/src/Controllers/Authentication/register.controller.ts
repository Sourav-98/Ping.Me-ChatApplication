
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import SMTP from 'Utilities/SMTP/SMTP.utility';

import { Router, Request, Response } from 'express';
const registerController = Router();

import { RegisterFormBody } from 'Utilities/FormRequestTypes/FormRequestTypes';

import * as registerService from 'Services/Authentication/register.service';
import * as emailVerifierService from 'Services/Authentication/emailVerifier.service';

import * as ControllerUtility from 'Utilities/Controllers/Authentication/authController.utility';
import { ResponseEnums } from 'Utilities/Enums/ResponseEnums';

let asyncDelay = async(time : number) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    })
}

registerController.get('/register', async(req : Request, res : Response) => {
    let responseData = await registerService.defaultRegisterService();
    await asyncDelay(2000);
    res.send(responseData);
});


registerController.post('/register', async(req : Request<{}, {}, RegisterFormBody>, res : Response) => {
    let userData = req.body;

    // check if valid data parameters was passed to the /register POST request
    let paramsList : Array<string> = ['firstName', 'lastName', 'emailId', 'password'];
    if(!ControllerUtility.isRequestParamsValid(userData, paramsList)){
        res.status(400).send(JSON.stringify(ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS));
        return;
    }
    try{
        let registerServiceResult = await registerService.newUserRegistration(userData);
        await asyncDelay(1650);
        switch (registerServiceResult){
            case -1 : res.send(JSON.stringify(ResponseEnums.REGISTER_FAIL_EMAIL_ID_TAKEN)); break;
            case 0 : res.send(JSON.stringify(ResponseEnums.REGISTER_FAIL_INVALID_EMAIL_ID)); break;
            case 1 :
                // registration is successful - generate the email verification encrypted string
                let emailVerificationTokenEncrypted = await emailVerifierService.generateEmailVerifierTokenV2(userData.emailId);

                let emailMessage : nodemailer.SendMailOptions = {
                    from : "Ping.Me",
                    sender : "notifications@ping.me",
                    to : userData.emailId,
                    subject : "Your New Ping.Me Acount Verification",
                    text : "Email verification token : http://localhost:8080/email-verify-v2/" + emailVerificationTokenEncrypted,
                    html : `Email Verification link : <a href="http://localhost:8080/email-verify-v2/${emailVerificationTokenEncrypted}">http://localhost:8080/email-verify-v2/${emailVerificationTokenEncrypted}</a>`
                }
                // call smtp service to email the verification token link
                SMTP.getEmailTransporter().sendMail(emailMessage);
                res.send(JSON.stringify(ResponseEnums.REGISETER_SUCCESS));
                break;
            default: res.send(JSON.stringify({'blank' : 'blank'}));
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send(JSON.stringify({...ResponseEnums.REGISTER_FAIL_OTHER, 'err' : err}));
    }
    
})

export default registerController;
