// login service - provides authentication service for a Chat User Login

const { ChatUserDAO } = require('./../../repository/ChatUserDAO');

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

exports.defaultLoginMessage = async function(){
    return defaultMessage;
}

exports.defaultUserLogin = async function(userCredentials){
    try{
        let loginUser = await ChatUserDAO.findUserById(userCredentials.emailId);
        console.log(loginUser);
        if(loginUser.getPassword() != userCredentials.password){
            return false;
        }
        return true;
    }
    catch(err){
        console.log(err);
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
