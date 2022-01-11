
const { ChatUserDTO } = require('./../models/ChatUserDTO');
const { Connection } = require('./../util/db/dbConn.util');

// Basic Chat User CRUD Operation + Additional user fetches operations
class ChatUserDAO{
    
    // MongoDB Collection Name for ChatUserDAO
    static _collectionName = "chat-users";

    /*

    Functions Listing

    0. getAllChatUsers() - admin acess only
    1. findUserByEmailId(chatUserEmailId)
    2. insertNewUser(chatUserData)
    3. deleteUserByEmailId(chatUserEmailId)
    4. updateUserDataByEmailId(chatUserData)
    5. updateUserPasswordbyEmailId(chatUserData)
    6. updateUserLastLoginByEmailId(chatUserData)
    7. updateUserIsVerifiedByEmailId(chatUserEmailId)

    */

    // Get the list of all the Chat Users
    static async findAll(){
        try{
            return await Connection.getDb().collection(this._collectionName).find().toArray();
        }
        catch(err){
            console.log("Error at findAll() -> " + err);
            throw err;
        }
    }
    
    // Find a Chat User by the given unique Email Id
    static async findUserById(chatUserEmailId){
        try{
            let chatUserDB = await Connection.getDb().collection(this._collectionName).find({emailId : chatUserEmailId});
            return new ChatUserDTO(chatUserDB.firstName, chatUserDB.lastName, chatUserDB.emailId, chatUserDB.password, chatUserDB.lastLogin, chatUserDB.lastPasswordChange, chatUserDB.isVerified, chatUserDB.rolesList);
        }
        catch(err){
            console.log("Error at findUserById() -> " + err);
            throw err;
        }
    }

    // Insert a new Chat User given the user details
    static async insertNewUser(chatUserData){
        try{
            let chatUserDTO = new ChatUserDTO(chatUserData.firstName, chatUserData.lastName, chatUserData.emailId, chatUserData.password, chatUserData.lastLogin, chatUserData.lastPasswordChange, chatUserData.isVerified, chatUserData.rolesList);
            await Connection.getDb().collection(this._collectionName).insertOne(chatUserDTO);
            return true;
        }
        catch(err){
            console.log("Error at insertNewUser() -> " + err);
            throw err;
        }
    }

    // delete an existing Chat User by the given Email Id
    static async deleteUserByEmailId(chatUserEmailId){
        try{
            await Connection.getDb().collection(this._collectionName).delete({emailId : chatUserEmailId});
            return true;
        }
        catch(err){
            console.log("Error at deleteUserAccount() -> " + err);
            throw err;
        }
    }
    
    // update the details of a Chat User by the given Email Id
    static async updateUserDataByEmailId(chatUserData){  // Updates all the user info except emailId, password and lastPasswordChange
        try{
            await Connection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
                $set : {
                    "firstName" : chatUserData.firstName,
                    "lastName" : chatUserData.lastName,
                    "rolesList" : chatUserData.rolesList
                }
            });
            return true;
        }
        catch(err){
            console.log("Error at updateUserDetails() -> " + err);
            throw err;
        }
    }

    // update the Password of a Chat User by the given Email Id
    static async updateUserPasswordByEmailId(chatUserData){
        try{
            await Connection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
                $set : {
                    "password" : chatUserData.password,
                    "lastPasswordChange" : chatUserData.lastPasswordChange
                }
            })

        }
        catch(err){
            console.log("Error at updateUserPasswordByEmailId() -> " + err);
            throw err;
        }
    }

    // update Chat User's last login status by the give Email Id
    static async updateUserLastLoginByEmailId(chatUserData){
        try{
            await Connection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
                $set : {
                    "lastLogin" : chatUserData.lastLogin
                }
            });
            return true;
        }
        catch(err){
            console.log("Error at updateuserLastLoginByEmailId() -> " + err);
            throw err;
        }
    }

    // update Chat User's verification status by the givem Email Id
    static async updateUserIsVerifiedByEmailId(chatUserEmailId){
        try{
            await Connection.getDb().collection(this._collectionName).updateOne({emailId : chatUserEmailId}, {
                $set : {
                    "isVerified" : true
                }
            })
        }
        catch(err){
            console.log("Error at updateUserIsVerifiedByEmailId() -> " + err);
            throw err;
        }
    }

    
}

module.exports = { ChatUserDAO };
