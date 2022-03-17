
import jwt from 'jsonwebtoken';
import {Router, Request, Response} from 'express';
import { ResponseEnums } from 'Utilities/Enums/ResponseEnums';
import { EmailVerfierFormBody } from 'Utilities/FormRequestTypes/FormRequestTypes'; 

import * as emailVerifierService from 'Services/Authentication/emailVerifier.service';

const emailVerifierController = Router();

emailVerifierController.post('/email-verify', async(req : Request<{}, {}, EmailVerfierFormBody>, res : Response) : Promise<void> => {

    let emailVerifierObject : EmailVerfierFormBody = req.body;

    let tokenValidityCheckResponse = await emailVerifierService.verifyEmailVerifierToken(emailVerifierObject.emailId, emailVerifierObject.token);
    
    switch(tokenValidityCheckResponse){
        case -1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_INVALID_TOKEN)); break;
        case 0 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_EXPIRED_TOKEN)); break;
        case 1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_SUCCESS)); break;
        default : res.send(JSON.stringify(ResponseEnums.ANNONYMOUS_ERR)); break;
    }
});


/**
 * @deprecated - Obsolete >> email Id should not be sent as it is in the query parameter
 */
// Query Parameter method - Obsolete >> email Id should not be sent as it is in the query parameter
emailVerifierController.get('/email-verify-v1', (req: Request<{}, {}, {}, {tokenString : string}>, res : Response) => {

    // request url : http://localhost:8080/email-verify-v1?tokenString=fknakewbuabdnfkajbdgs

    let tokenString : string = req.query.tokenString;
    // console.log(tokenString);
    res.setHeader('Content-Type', 'text/html');
    // send a email verification success html response
    res.send({ "tokenString" : tokenString});
});


// URL parameter method - using JWT
emailVerifierController.get('/email-verify-v2/:tokenStringEncoded', async(req: Request<{tokenStringEncoded : string}, {}, {}, {}>, res : Response) => {
    // request url : http://localhost:8080/email-verify-v2/fknakewbuabdnfkajbdgsb4kj23b25hvs-d4-gvwegw3h2

    let tokenStringEncoded : string = req.params.tokenStringEncoded;

    let tokenValidityCheckResponse = await emailVerifierService.verifyEmailVerifierTokenV2(tokenStringEncoded);

    switch(tokenValidityCheckResponse){
        case -1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_INVALID_TOKEN)); break;
        case 0 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_EXPIRED_TOKEN)); break;
        case 1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_SUCCESS)); break;
        default : res.send(JSON.stringify(ResponseEnums.ANNONYMOUS_ERR)); break;
    }
});

export default emailVerifierController;
