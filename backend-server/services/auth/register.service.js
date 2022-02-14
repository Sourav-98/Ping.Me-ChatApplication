const { ChatUserDAO } = require('./../../repository/ChatUserDAO');
const { ChatUserDTO } = require('./../../models/ChatUserDTO');
const { Errors } = require('../../util/errorCodes/errorCodes');

const bcrypt = require('bcrypt');

const chatUserDAO = new ChatUserDAO();

let defaultMessage = {
    service: "Register Service",
    message: "The service responsible for creating new users"
}

/** defaultRegistrationService
 * a dummy registration service for /register GET method
 */
exports.defaultRegisterService = async function(){
    return defaultMessage;
}

/** newUserRegistration service
 * called when a new user is being created
 * returns 1 if the user is successfully created in the db
 * returns 0 if the user email id already exists in the db
 * returns -1 if the user email id is an invalid email id
 * throws any execution error, if any
 */
exports.newUserRegistration = async function(userData){
    let user = new ChatUserDTO({ firstName: userData.firstName, lastName: userData.lastName, emailId: userData.emailId, password: userData.password});
    try{
        // check if the user already exists
        let dbSearchUserResult = await ChatUserDAO.findUserById(user.getEmailId());
        if(dbSearchUserResult){
            /** Password Recovery Option -> to be implemented
             *  If the user email id exists, redirect to forgot password (or) account recovery
             */
            return -1;
        }
        /** User can now be inserted */
        user.setPassword(await bcrypt.hash(user.getPassword(), 10));
        await ChatUserDAO.insertNewUser(user);
        return 1;
    }
    catch(err){
        console.log("Error at newUserRegistration() service -> " + JSON.stringify(err));
        throw err;
    }
    // try{
    //     let searchUser = await ChatUserDAO.findUserById(user.getEmailId());
    //     if(searchUser){ // if there exists a user with the given email id
    //         /** Password Recovery Option -> to be implemented
    //          *  If the user email id exists, redirect to forgot password (or) account recovery
    //          */
    //         throw Errors.USER_EMAIL_ID_EXISTS_ERR;
    //     }
    //     else{
    //         try{
    //             // change the password to a hash and store in the db
    //             user.setPassword(await bcrypt.hash(user.getPassword(), 10));
    //             return await ChatUserDAO.insertNewUser(user);
    //         }
    //         catch(err){
    //             console.log("Error at newUserRegistration() service -> " + err);
    //         }
    //     }
    // }
    // catch(err){
    //     console.log("Error at newUserRegistration() service -> " + JSON.stringify(err));
    //     throw err;
    // }
}
