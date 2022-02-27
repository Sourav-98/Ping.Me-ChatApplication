
import {Router, Request, Response} from 'express';

import { EmailVerfierFormBody } from 'Utilities/FormRequestTypes/FormRequestTypes'; 

import * as emailVerifierService from 'Services/Authentication/emailVerifier.service';

const emailVerifierController = Router();

emailVerifierController.post('/email-verify', async(req : Request<{}, {}, EmailVerfierFormBody>, res : Response) : Promise<void> => {
    let emailVerifierObject : EmailVerfierFormBody = req.body;
    // 1. check for the validity of the token
    let isValid = emailVerifierService.verifyEmailVerifierToken(emailVerifierObject.emailId, emailVerifierObject.token);
    // console.log(tokenString);
    res.setHeader('Content-Type', 'text/html');
    // send a email verification success html response
    res.send({ "tokenString" : emailVerifierObject.token });
});

emailVerifierController.get('/email-verify-1', (req: Request<{}, {}, {}, {tokenString : string}>, res : Response) => {
    let tokenString : string = req.query.tokenString;
    // console.log(tokenString);
    res.setHeader('Content-Type', 'text/html');
    // send a email verification success html response
    res.send({ "tokenString" : tokenString});
});

export default emailVerifierController;
