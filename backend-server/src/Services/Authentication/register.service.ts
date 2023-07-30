
import ChatUserDAO from '../../Repositories/ChatUserDAO';
import ChatUserDTO from '../../Models/ChatUserDTO';

import * as AppStatusCodes from '../../Utilities/Enums/StatusCodes/StatusCodes';

// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';

const defaultMessage = {
    service: "Register Service",
    message: "The service responsible for creating new users"
}

/** defaultRegistrationService
 * a dummy registration service for /register GET method
 */
export const defaultRegisterService = async function(){
    return defaultMessage;
}

/** 
 * @description newUserRegistration service - called when a new user is being created
 * @throws any execution error, if any
 */
export const newUserRegistration = async function(userData : any) : Promise<string>{
    let user = new ChatUserDTO({ firstName: userData.firstName, lastName: userData.lastName, emailId: userData.emailId, password: userData.password});
    try{
        // check if the user already exists
        let dbSearchUserResult = await ChatUserDAO.findUserById(user.getEmailId());
        if(dbSearchUserResult){
            return AppStatusCodes.NEW_USER_REGISTRATION_FAIL_USER_EXISTS;
        }
        /**
         * @todo check whether the email id is a valid email id
         */

        /** User can now be inserted */
        user.setPassword(await bcrypt.hash(user.getPassword(), 10));
        await ChatUserDAO.insertNewUser(user);
        return AppStatusCodes.NEW_USER_REGISTRATION_SUCCESS;
    }
    catch(err){
        console.log("Error at newUserRegistration() service -> " + JSON.stringify(err));
        throw err;
    }
}
