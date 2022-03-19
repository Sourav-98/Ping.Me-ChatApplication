
import nodemailer from 'nodemailer';
import SMTP from 'Utilities/SMTP/SMTP.utility';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import EmailVerifierDAO from "Repositories/EmailVerifierDAO";
import EmailVerifierDTO from "Models/EmailVerifierDTO";

import ChatUserDAO from 'Repositories/ChatUserDAO';

/** Token Generator method
 * @description - temporary method for generating token
 * @todo - implement a way to generate a hash of a token - using bcrypt
 */
const tokenGenerate = async() : Promise<string> => {
    let tokenString : string;
    tokenString = uuid();
    return tokenString;
}

/** Token Matcher method
 * @description - temporary method for token matching
 * @todo - implement a dway to match the token hashes - using bcrypt
 */
const matchToken = async(tokenA : string, tokenB : string) : Promise<boolean> => {
    if(tokenA === tokenB){
        return true;
    }
    return false;
}

/**
 * @deprecated
 * @description - generates a email verification token for a newly reigstered user
 * @returns - the tokenObject for a newly registered user
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
 * @description - generates a email verification token for a newly reigstered user
 * @returns {string} tokenEncrypted - a JSON string consisting of the token data needed for verification
 * @returns {number} -1 - if the user was not registered before generating the token
 */
 export const generateEmailVerifierTokenV2 = async function(userEmailId : string) : Promise<number>{
    // before generating the token, make sure whether the user has registed or not
    let chatUser = await ChatUserDAO.findUserById(userEmailId);
    if(chatUser){
        // check whether a verification token exists for the user or not
        let tokenObject = await EmailVerifierDAO.getEmailVerificationToken(userEmailId);
        if(!tokenObject){    // if token does not exist in the stash for the user -> generate a new token and insert into stash
            tokenObject = new EmailVerifierDTO({emailId : userEmailId, token : await tokenGenerate(), tokenDate : new Date()});
            await EmailVerifierDAO.insertEmailVerificationTokenIntoStash(tokenObject);
        }
        let tokenEncrypted = jwt.sign({...tokenObject}, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
        let emailMessage : nodemailer.SendMailOptions = {
            from : "Ping.Me",
            sender : "notifications@ping.me",
            to : userEmailId,
            subject : "Your New Ping.Me Acount Verification",
            text : "Email verification token : http://localhost:8080/email-verify-v2/" + tokenEncrypted,
            html : `Email Verification link : <a href="http://localhost:8080/email-verify-v2/${tokenEncrypted}">http://localhost:8080/email-verify-v2/${tokenEncrypted}</a>`
        }
        // call smtp service to email the verification token link
        SMTP.getEmailTransporter().sendMail(emailMessage);
        return 1;
    }
    else{
        return -1;
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

    try{
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
    catch(err){
        console.log(err);
        throw(err);
    }
}

/**
 * @description - used for resending a lost token, or generating a new token
 * @returns {number} -1 if the user is not registered and is requesting for token regeneration
 * @returns {number} 1 - if the token is generated and emailed successfully
 */
export const resendVerificationToken = async function(tokenEncrypted : string) : Promise<number>{
    try{
        let tokenDecrypted : any = jwt.verify(tokenEncrypted, 'Fh432-dnwefwvr453-dvss0eg234-dvsevsjajnakngvskianeir4r5n235j2-9999akenage');
        let userEmailId = tokenDecrypted._emailId;
        return await generateEmailVerifierTokenV2(userEmailId);
    }
    catch(err){
        console.log(err);
        throw(err);
    }
}
