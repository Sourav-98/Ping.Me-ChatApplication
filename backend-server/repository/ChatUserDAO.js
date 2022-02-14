
const { ChatUserDTO } = require('./../models/ChatUserDTO');
const { Connection } = require('./../util/db/dbConn.util');

const { Errors } = require('../util/errorCodes/errorCodes');

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
    static async findAllUsers(){
        console.log('ChatUser DAO >> findAllUsers() -------------');
        try{
            let chatUsersDB = await Connection.getDb().collection(this._collectionName).find().toArray();
            let chatUsersDTO = [];
            chatUsersDB.map( chatUserDB => {
                chatUsersDTO.push(new ChatUserDTO({...chatUserDB}));
            });
            return chatUsersDTO;
        }
        catch(err){
            console.log("Error at findAll() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }
    
    // Find a Chat User by the given unique Email Id
    // return null if no users found
    // return the user object if the user exists
    // throw error if any
    static async findUserById(chatUserEmailId){
        console.log('ChatUser DAO >> findUserById() -------------');
        try{
            
            let chatUserDB = await Connection.getDb().collection(this._collectionName).findOne({emailId : chatUserEmailId});    // returns a single object
            if(!chatUserDB){
                return null;      
            }
            let chatUserDTO = new ChatUserDTO({...chatUserDB}); // or new ChatUserDTO(chatUserDB);
            console.log(chatUserDTO);
            return chatUserDTO;
        }
        catch(err){
            console.log("Error at findUserById() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    // Insert a new Chat User given the user details
    // return true if user successfully entered
    // throw error if any
    static async insertNewUser(chatUserData){
        console.log('ChatUser DAO >> insertNewUser() -------------');
        try{
            let result = await Connection.getDb().collection(this._collectionName).insertOne(chatUserData);
            console.log('User Inserted >> ' + JSON.stringify(result));
            return true;
        }
        catch(err){
            console.log("Error at insertNewUser() -> " + err);
            throw Errors.SERVER_DB_ERR;
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
            throw Errors.SERVER_DB_ERR;
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
