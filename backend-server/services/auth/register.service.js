const { ChatUserDAO } = require('./../../repository/ChatUserDAO');
const { ChatUserDTO } = require('./../../models/ChatUserDTO');

const chatUserDAO = new ChatUserDAO();

let defaultMessage = {
    service: "Register Service",
    message: "The service responsible for creating new users"
}

exports.defaultRegisterService = async function(){
    return defaultMessage;
}

exports.newUserRegistration = async function(userData){
    let user = new ChatUserDTO(userData.firstName, userData.lastName, userData.emailId, userData.password);
    try{
        return await ChatUserDAO.insertNewUser(user);
    }
    catch(err){
        switch(err.code){
            case 11000: throw { // mongodb error 11000 - entry with the same primary key already exists
                err_code: err.code, 
                err_message: "Error - User with an email id: " + userData.email + " already exists!"
            };
            default: throw err;
        }
    }
}