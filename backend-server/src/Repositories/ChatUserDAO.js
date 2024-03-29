
import ChatUserDTO from 'Models/ChatUserDTO';
import DBConnection from 'Utilities/DB/dbConn.utility';

import { Errors } from 'Utilities/Enums/errorCodes/errorCodes';

// Basic Chat User CRUD Operation + Additional user fetches operations



export default class ChatUserDAO{
    
    // MongoDB Collection Name for ChatUserDAO
    static _collectionName = "chat-users";

    /** ChatUserDAO - The Data Access Object for the chat-users collection
     *  List of functions:
     *  0. findAllUsers()
     *  1. findUserById()
     *  2. insertNewUser()
     *  3. deleteUserByEmailId()
     *  4. updateUserDataByEmailId()
     *  5. updateUserPasswordByEmailId()
     *  6. updateUserLastLoginByEmailId()
     *  7. updateUserIsVerifiedByEmailId()
     */

    static async findAllUsers(){
        console.log('ChatUser DAO >> findAllUsers() -------------');
        try{
            let chatUsersDB = await DBConnection.getDb().collection(this._collectionName).find().toArray();
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
    
    /** 
     *  @function findUserById
     *  @description : finds a chat user from the collection, given the user's email id
     *  @param {string} chatUserEmailId
     *  @returns {ChatUserDTO} chatUserDTO : if there exists a chat user
     *  @returns {null} : if no user is found
     *  @throws {Errors.SERVER_DB_ERR} : if any
     */
    static async findUserById(chatUserEmailId){
        console.log('ChatUser DAO >> findUserById() -------------');
        try{
            
            let chatUserDB = await DBConnection.getDb().collection(this._collectionName).findOne({emailId : chatUserEmailId});    // returns a single object
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
            let result = await DBConnection.getDb().collection(this._collectionName).insertOne(chatUserData);
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
            await DBConnection.getDb().collection(this._collectionName).delete({emailId : chatUserEmailId});
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
            await DBConnection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
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
            await DBConnection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
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
            await DBConnection.getDb().collection(this._collectionName).updateOne({emailId : chatUserData.emailId}, {
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
            await DBConnection.getDb().collection(this._collectionName).updateOne({emailId : chatUserEmailId}, {
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
