const { ChatUserDAO } = require('./../../repository/ChatUserDAO');
const { ChatUserDTO } = require('./../../models/ChatUserDTO');
const { Errors } = require('../../util/errorCodes/errorCodes');

const bcrypt = require('bcrypt');

const chatUserDAO = new ChatUserDAO();

let defaultMessage = {
    service: "Register Service",
    message: "The service responsible for creating new users"
}

let asyncDelay = async(time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve;
        }, time);
    })
}

exports.defaultRegisterService = async function(){
    await asyncDelay(5000);
    return defaultMessage;
}

exports.newUserRegistration = async function(userData){
    let user = new ChatUserDTO();
    user.setFirstName(userData.firstName);
    user.setLastName(userData.lastName);
    user.setEmailId(userData.emailId);
    user.setPassword(userData.password);
    // check if the user already exists
    try{
        let searchUser = await ChatUserDAO.findUserById(user.getEmailId());
        if(searchUser){ // if there exists a user with the given email id
            throw Errors.USER_EMAIL_ID_EXISTS_ERR;
        }
        else{
            try{
                // change the password to a hash and store in the db
                user.setPassword(await bcrypt.hash(user.getPassword(), 10));
                return await ChatUserDAO.insertNewUser(user);
            }
            catch(err){
                console.log("Error at newUserRegistration() service -> " + err);
            }
        }
    }
    catch(err){
        console.log("Error at newUserRegistration() service -> " + JSON.stringify(err));
        throw err;
    }
}
