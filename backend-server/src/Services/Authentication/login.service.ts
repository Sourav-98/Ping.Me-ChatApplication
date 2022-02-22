// login service - provides authentication service for a Chat User Login

import ChatUserDAO from 'Repositories/ChatUserDAO';

import bcrypt from 'bcrypt';

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

export const defaultLoginMessage = function(){
    return defaultMessage;
}

/** defaultUserLogin service - used to login a new user
 * returns 1 if login is successful
 * returns 0 if the user email id is not registered
 * returns -1 if the user password entered does not match the password in the db
 * throws exception if any
 */
export const defaultUserLogin = async function(userCredentials : any){
    try{
        console.log("defaultUserLogin() service ->");
        let loginUser = await ChatUserDAO.findUserById(userCredentials.emailId);
        if(!loginUser){ 
            console.log('User doesnot exist');
            return 0;
        }
        if( !await bcrypt.compare(userCredentials.password, loginUser.getPassword() || '') ){
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

export const emailVerification = async function(userEmailId : string){
    try{
        return await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
    }
    catch(err){
        console.log(err);
    }
}
