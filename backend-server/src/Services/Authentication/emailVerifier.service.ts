
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import EmailVerifierDAO from "Repositories/EmailVerifierDAO";
import EmailVerifierDTO from "Models/EmailVerifierDTO";
import ChatUserDAO from 'Repositories/ChatUserDAO';

import * as emailDispatcher from 'Services/SMTP/emailDispatcher.service';
import * as AppStatusCodes from 'Utilities/Enums/StatusCodes/StatusCodes';

/** Token Generator method
 * @description temporary method for generating token
 * @todo implement a way to generate a hash of a token - using bcrypt
 */
const tokenGenerate = async() : Promise<string> => {
    let tokenString : string;
    tokenString = uuid();
    return tokenString;
}

/** Token Matcher method
 * @description temporary method for token matching
 * @todo implement a way to match the token hashes - using bcrypt
 */
const matchToken = async(tokenA : string, tokenB : string) : Promise<boolean> => {
    if(tokenA === tokenB){
        return true;
    }
    return false;
}

/**
 * @deprecated
 * @description generates a email verification token for a newly reigstered user
 * @returns the tokenObject for a newly registered user
 */
export const generateEmailVerifierToken = async function(userEmailId : string) : Promise<EmailVerifierDTO | null>{
    // before generating the token, make sure whether the user has registed or not
    let chatUser = ChatUserDAO.findUserById(userEmailId);
    if(!chatUser){
        return null;
    }
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
 * @description generates a email verification token for a newly reigstered user - token is sent over email
 * @param {string} userEmailId - the user email id for which the token is to be generated
 * @returns {boolean} true - if the token is generated and email successfully
 * @returns {boolean} false - otherwise
 */
 export const generateEmailVerifierTokenV2 = async function(userEmailId : string) : Promise<void>{
    try{
        // check whether a verification token exists for the user or not
        let tokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
        if(!tokenObject){    // if token does not exist in the stash for the user -> generate a new token and insert into stash
            tokenObject = new EmailVerifierDTO({emailId : userEmailId, token : await tokenGenerate(), tokenDate : new Date()});
            await EmailVerifierDAO.insertEmailVerificationTokenIntoStash(tokenObject);
        }
        let tokenEncrypted = jwt.sign({...tokenObject}, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
        emailDispatcher.sendUserVerificationEmail(userEmailId, tokenEncrypted);
    }
    catch(err){
        console.log('Error at generateEmailVerifierTokenV2() -> ' + err);
    }
}

/**
 * @deprecated
 * @description - verifies the token sent back by the newly registered user
 * @param {string} userEmailId - the email id of the user currently calling the service
 * @param {string} token - the verification token sent by the user
 * @returns {number} 0 - if the token does not exist
 * @returns {number} -1 - if the token doesnot match the token stored in the stash
 * @returns {number} 1 - if the token matches the token stored in the stash
 */
export const verifyEmailVerifierToken = async function(userEmailId : string, token : string) : Promise<string>{
    let existingTokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
    if(!existingTokenObject){
        // if the token does not exist, that means the token has expired
        return AppStatusCodes.EMAIL_VERIFY_FAIL_EXPIRED_TOKEN;
    }
    if(await matchToken(token, existingTokenObject.getToken())){    // if the token matches, set the user isVerified flag as true, and delete the token from stash
        await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
        await EmailVerifierDAO.deleteTokenFromStash(token);
        return AppStatusCodes.EMAIL_VERIFY_SUCCESS;
    }
    return AppStatusCodes.EMAIL_VERIFY_FAIL_INVALID_TOKEN;
}

/**
 * @description verifies the token sent back by the newly registered user
 * @param {string} tokenEncrypted the JSON string consisting of the data needed to verify the token
 */
 export const verifyEmailVerifierTokenV2 = async function(tokenEncrypted : string) : Promise<string>{

    try{
        let tokenDecrypted : any = jwt.verify(tokenEncrypted, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
        let userEmailId = tokenDecrypted._emailId;
        let token = tokenDecrypted._token;

        // check if the user exists
        let chatUser = await ChatUserDAO.findUserById(userEmailId);
        if( chatUser === null || chatUser.getIsVerified()){  // if chatUser does not exist, or the user is already verified, then the user was never registered
            return AppStatusCodes.EMAIL_VERIFY_FAIL_INVALID_REQUEST;
        }

        let existingTokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
        if(!existingTokenObject){
            // if the token does not exist, that means the token has expired
            return AppStatusCodes.EMAIL_VERIFY_FAIL_EXPIRED_TOKEN;
        }
        if(await matchToken(token, existingTokenObject.getToken())){    // if the token matches, set the user isVerified flag as true, and delete the token from stash
            ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
            EmailVerifierDAO.deleteTokenFromStash(token);
            return AppStatusCodes.EMAIL_VERIFY_SUCCESS;
        }
        else{
            return AppStatusCodes.EMAIL_VERIFY_FAIL_INVALID_TOKEN;
        }
    }
    catch(err){
        console.log(err);
        return AppStatusCodes.EMAIL_VERIFY_FAIL_PROCESS_ERROR;
    }
}

/**
 * @description - used for resending a lost token, or generating a new token
 * @param {string} tokenEncrypted the JSON string consisting of the data needed to verify the token
 * @returns {number} -1 if the user was not registered before re-generating the token
 * @returns {number} 0 if the user is already verified and is trying to re-generate a verification token
 * @returns {number} 1 if the user is not yet verified, and a new token or existing token (if present) is sent via email
 * @returns {number} -99 if the JWT token is malformed
 */
export const resendVerificationToken = async function(tokenEncrypted : string) : Promise<string>{
    try{
        let tokenDecrypted : any = jwt.verify(tokenEncrypted, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
        let userEmailId : string = tokenDecrypted._emailId;
        let chatUser = await ChatUserDAO.findUserById(userEmailId);
        if(!chatUser || chatUser.getIsVerified()){
            // the chat user does not exist in the db
            return AppStatusCodes.EMAIL_VERIFY_REGENERATE_FAIL_INVALID_REQUEST;
        }
        generateEmailVerifierTokenV2(userEmailId);
        return AppStatusCodes.EMAIL_VERIFY_REGENERATE_SUCCESS;
    }
    catch(err){
        console.log('Error at resendVerificationToken() -> ' + err);
        return AppStatusCodes.EMAIL_VERIFY_REGENERATE_FAIL_PROCESS_ERROR;
    }
}
