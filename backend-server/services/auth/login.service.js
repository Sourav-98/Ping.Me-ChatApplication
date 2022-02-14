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

/** defaultUserLogin service - used to login a new user
 * returns 1 if login is successful
 * returns 0 if the user email id is not registered
 * returns -1 if the user password entered does not match the password in the db
 * throws exception if any
 */
exports.defaultUserLogin = async function(userCredentials){
    try{
        console.log("defaultUserLogin() service ->");
        let loginUser = await ChatUserDAO.findUserById(userCredentials.emailId);
        if(!loginUser){ 
            console.log('User doesnot exist');
            return 0;
        }
        if( !await bcrypt.compare(userCredentials.password, loginUser.password) ){
            console.log('Invalid User Password');
            return -1
        }
        console.log('Valid Credentials');
        return 1;
    }
    catch(err){
        console.log('Error at defaultUserLogin() -> ' + JSON.stringify(err));
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
