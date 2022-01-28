// login service - provides authentication service for a Chat User Login

const { ChatUserDAO } = require('./../../repository/ChatUserDAO');
const { Errors } = require('../../util/errorCodes/errorCodes');

const bcrypt = require('bcrypt');

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

exports.defaultLoginMessage = function(){
    return defaultMessage;
}


// defaultUserLogin - the standard user login service
// returns true if the user credentials are valid
// throws DB_USER_DOES_NOT_EXIST_ERROR if user email id is invalid (does not exists in the database)
// throws DB_USER_INVALID_PASSWORD_ERROR if the user password is invalid
// throw other errors if any
exports.defaultUserLogin = async function(userCredentials){
    try{
        let loginUser = await ChatUserDAO.findUserById(userCredentials.emailId);
        if(!loginUser){ 
            console.log('No such user found');
            throw Errors.USER_EMAIL_ID_DOES_NOT_EXIST_ERR;
        }
        if( !await bcrypt.compare(userCredentials.password, loginUser.password) ){
            console.log('Invalid User Credentials');
            throw Errors.USER_PASSWORD_INCORRECT_ERR;
        }
        else{
            console.log('Valid Credentials');
            return true;
        }
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

exports.emailVerification = async function(userEmailId){
    try{
        return await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
    }
    catch(err){
        console.log(err);
    }
}
