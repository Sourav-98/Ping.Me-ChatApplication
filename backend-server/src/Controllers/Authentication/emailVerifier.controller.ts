
import {Router, Request, Response} from 'express';
import { ResponseEnums } from 'Utilities/Enums/ResponseEnums';

import * as emailVerifierService from 'Services/Authentication/emailVerifier.service';

const emailVerifierController = Router();

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

    // console.log('URL Hit');
    let tokenStringEncoded : string = req.params.tokenStringEncoded;
    try{
        let tokenValidityCheckResponse = await emailVerifierService.verifyEmailVerifierTokenV2(tokenStringEncoded);
        switch(tokenValidityCheckResponse){
            case -1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_INVALID_TOKEN)); break;
            case 0 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_FAIL_EXPIRED_TOKEN)); break;
            case 1 : res.send(JSON.stringify(ResponseEnums.EMAIL_VERIFY_SUCCESS)); break;
            default : res.send(JSON.stringify(ResponseEnums.ANNONYMOUS_ERR)); break;
        }
    }
    catch(err){
        res.status(500).send(ResponseEnums.SERVER_ERR);
    }    
});

/**
 * @description - handling token resend (for expired token or lost activation email)
 */
emailVerifierController.get('/email-verifiy-v2/token-resend/:previousTokenStringEncoded', async(req : Request<{previousTokenStringEncoded : string}, {}, {}, {}>, res : Response) => {

    let previousTokenStringEncoded : string = req.params.previousTokenStringEncoded;
    let tokenRegenerationStatus = await emailVerifierService.resendVerificationToken(previousTokenStringEncoded);
    switch(tokenRegenerationStatus){
        case 1 : res.send(JSON.stringify(ResponseEnums.USER_VALIDATE_TOKEN_RESEND_SUCCESS));
        default : res.send(JSON.stringify({'err' : 'User not registered!'}));
    }
});

export default emailVerifierController;
