
import ChatUserDAO from "Repositories/ChatUserDAO";

export const userPasswordReset = async function(chatUserData){
    try{
        let chatUser = await ChatUserDAO.findUserById(chatUserData.emailId);
        

    }
    catch(err){
        console.log("Error at userPasswordReset");
    }
}
