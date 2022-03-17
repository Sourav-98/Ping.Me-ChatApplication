
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import EmailVerifierDAO from "Repositories/EmailVerifierDAO";
import EmailVerifierDTO from "Models/EmailVerifierDTO";

import ChatUserDAO from 'Repositories/ChatUserDAO';

/** Token Generator method
 * @description - temporary method for generating token
 */
const tokenGenerate = async() : Promise<string> => {
    let tokenString : string;
    tokenString = uuid();
    return tokenString;
}

/** Token Matcher method
 * @description - temporary method for token matching
 */
const matchToken = async(tokenA : string, tokenB : string) : Promise<boolean> => {
    if(tokenA === tokenB){
        return true;
    }
    return false;
}

/**
 * @description - generates a email verification token for a newly reigstered user
 * @returns - the tokenObject for a newly registered user
 */
export const generateEmailVerifierToken = async function(userEmailId : string) : Promise<EmailVerifierDTO>{
    // before generating the token, verify whether the token is already generated for the newly registered user
    let existingTokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(existingTokenObject){    // token already exists for the emailId
        return existingTokenObject;
    }
    // else - generate a new tokenObject to be stored in the temporary stash, and to be sent to the user via email SMTP service
    let tokenObject : EmailVerifierDTO = new EmailVerifierDTO({emailId : userEmailId, token : await tokenGenerate(), tokenDate : new Date()});
    await EmailVerifierDAO.insertEmailVerificationTokenIntoStash(tokenObject);
    return tokenObject;
}

/**
 * @description - generates a email verification token for a newly reigstered user
 * @returns {string} tokenEncrypted - a JSON string consisting of the token data needed for verification
 */
 export const generateEmailVerifierTokenV2 = async function(userEmailId : string) : Promise<string>{
    // before generating the token, verify whether the token is already generated for the newly registered user
    let tokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(!tokenObject){    // token already exists for the emailId
        tokenObject = new EmailVerifierDTO({emailId : userEmailId, token : await tokenGenerate(), tokenDate : new Date()});
        await EmailVerifierDAO.insertEmailVerificationTokenIntoStash(tokenObject);
    }
    let tokenEncrypted = jwt.sign({...tokenObject}, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage')
    // else - generate a new tokenObject to be stored in the temporary stash, and to be sent to the user via email SMTP service
    return tokenEncrypted;
}

/**
 * @description - verifies the token sent back by the newly registered user
 * @param {string} userEmailId - the email id of the user currently calling the service
 * @param {string} token - the verification token sent by the user
 * @returns {number} 0 - if the token does not exist
 * @returns {number} -1 - if the token doesnot match the token stored in the stash
 * @returns {number} 1 - if the token matches the token stored in the stash
 */
export const verifyEmailVerifierToken = async function(userEmailId : string, token : string) : Promise<number>{
    let existingTokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(!existingTokenObject){
        // if the token does not exist, that means the token has expired
        return 0;
    }
    if(await matchToken(token, existingTokenObject.getToken())){    // if the token matches, set the user isVerified flag as true, and delete the token from stash
        await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
        await EmailVerifierDAO.deleteTokenFromStash(token);
        return 1;
    }
    return -1;
}

/**
 * @description - verifies the token sent back by the newly registered user
 * @param {string} tokenEncrypted - the JSON string consisting of the data needed to verify the token
 * @returns {number} 0 - if the token does not exist
 * @returns {number} -1 - if the token doesnot match the token stored in the stash
 * @returns {number} 1 - if the token matches the token stored in the stash
 */
 export const verifyEmailVerifierTokenV2 = async function(tokenEncrypted : string) : Promise<number>{

    let tokenDecrypted : any = jwt.verify(tokenEncrypted, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
    let userEmailId = tokenDecrypted._emailId;
    let token = tokenDecrypted._token;

    let existingTokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(!existingTokenObject){
        // if the token does not exist, that means the token has expired
        return 0;
    }
    if(await matchToken(token, existingTokenObject.getToken())){    // if the token matches, set the user isVerified flag as true, and delete the token from stash
        await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
        await EmailVerifierDAO.deleteTokenFromStash(token);
        return 1;
    }
    return -1;
}
