
import { v4 as uuid } from 'uuid';

import EmailVerifierDAO from "Repositories/EmailVerifierDAO";
import EmailVerifierDTO from "Models/EmailVerifierDTO";

/** Token Generator method
 * @description - temporary method for generating token
 */
const tokenGenerate = async() : Promise<string> => {
    let tokenString : string;

    tokenString = uuid();

    return tokenString;
}

/**
 * @description - generates a email verification token for a newly reigstered user
 * @returns - the tokenObject for a newly registered user
 */
export const generateEmailVerifierToken = async function(userEmailId : string) : Promise<EmailVerifierDTO>{
    let tokenObject : EmailVerifierDTO;
    // before generating the token, verify whether the token is already generated for the newly registered user
    tokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(tokenObject){    // token already exists for the emailId
        return tokenObject;
    }

    // else - generate a new tokenObject to be stored in the temporary stash, and to be sent to the user via email SMTP service
    tokenObject = new EmailVerifierDTO({emailId : userEmailId, token : await tokenGenerate(), tokenDate : new Date()});
    return tokenObject;
    // let tokenObject : EmailVerifierDTO = await EmailVerifierDAO.setEmailVerificationToken();
}

/**
 * @description - verifies the token sent back by the newly registered user
 */
export const verifyEmailVerifierToken = async function(userEmailId : string, tokenString : string) : Promise<void>{

}
