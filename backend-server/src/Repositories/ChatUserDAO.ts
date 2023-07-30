
import ChatUserDTO from '../Models/ChatUserDTO';
import DBConnection from '../Utilities/DB/dbConn.utility';

import { Errors } from '../Utilities/Enums/errorCodes/errorCodes';

// Basic Chat User CRUD Operation + Additional user fetches operations



export default class ChatUserDAO{
    
    // MongoDB Collection Name for ChatUserDAO
    private static _collectionName : string = "chat-users";

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

    static async findAllUsers() : Promise<Array<ChatUserDTO>>{
        console.log('ChatUser DAO >> findAllUsers() -------------');
        try{
            let chatUsersDB = await DBConnection.getDb().collection(this._collectionName).find().toArray();
            let chatUsersDTO : Array<ChatUserDTO> = [];
            chatUsersDB.map( chatUserDB => {
                chatUsersDTO.push(new ChatUserDTO({
                    firstName : chatUserDB._firstName,
                    lastName : chatUserDB._lastName,
                    phoneNo : chatUserDB._phoneNo,
                    dateOfBirth : chatUserDB._dateOfBirth,
                    emailId : chatUserDB._emailId,
                    password : chatUserDB._password,
                    accountCreationDate : chatUserDB._accountCreationDate,
                    isVerified : chatUserDB._isVerified,
                    lastLogin : chatUserDB._lastLogin,
                    lastPasswordChange : chatUserDB._lastPasswordChage,
                    userRolesList : chatUserDB._userRolesList
                }));
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
    static async findUserById(chatUserEmailId : string) : Promise<ChatUserDTO | null>{
        console.log('ChatUser DAO >> findUserById() -------------');
        try{
            let chatUserDB = await DBConnection.getDb().collection(this._collectionName).findOne({_emailId : chatUserEmailId});    // returns a single object
            if(!chatUserDB){
                return null;      
            }
            let chatUserDTO = new ChatUserDTO({
                firstName : chatUserDB._firstName,
                lastName : chatUserDB._lastName,
                phoneNo : chatUserDB._phoneNo,
                dateOfBirth : chatUserDB._dateOfBirth,
                emailId : chatUserDB._emailId,
                password : chatUserDB._password,
                accountCreationDate : chatUserDB._accountCreationDate,
                isVerified : chatUserDB._isVerified,
                lastLogin : chatUserDB._lastLogin,
                lastPasswordChange : chatUserDB._lastPasswordChage,
                userRolesList : chatUserDB._userRolesList
            }); // or new ChatUserDTO(chatUserDB);
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
    static async insertNewUser(chatUserData : ChatUserDTO) : Promise<boolean>{
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
    static async deleteUserByEmailId(chatUserEmailId : string) : Promise<boolean>{
        try{
            await DBConnection.getDb().collection(this._collectionName).deleteOne({_emailId : chatUserEmailId});
            return true;
        }
        catch(err){
            console.log("Error at deleteUserAccount() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }
    
    // update the details of a Chat User by the given Email Id
    static async updateUserDataByEmailId(chatUserData : ChatUserDTO) : Promise<boolean>{  // Updates all the user info except emailId, password and lastPasswordChange
        try{
            await DBConnection.getDb().collection(this._collectionName).updateOne({_emailId : chatUserData.getEmailId()}, {
                $set : {
                    "_firstName" : chatUserData.getFirstName(),
                    "_lastName" : chatUserData.getLastName(),
                    "_rolesList" : chatUserData.getUserRolesList()
                }
            });
            return true;
        }
        catch(err){
            console.log("Error at updateUserDetails() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    // update the Password of a Chat User by the given Email Id
    static async updateUserPasswordByEmailId(chatUserData : ChatUserDTO) : Promise<boolean>{
        try{
            await DBConnection.getDb().collection(this._collectionName).updateOne({_emailId : chatUserData.getEmailId()}, {
                $set : {
                    "_password" : chatUserData.getPassword(),
                    "_lastPasswordChange" : chatUserData.getLastPasswordChange()
                }
            });
            return true;
        }
        catch(err){
            console.log("Error at updateUserPasswordByEmailId() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    // update Chat User's last login status by the give Email Id
    static async updateUserLastLoginByEmailId(chatUserData : ChatUserDTO) : Promise<boolean>{
        try{
            await DBConnection.getDb().collection(this._collectionName).updateOne({_emailId : chatUserData.getEmailId()}, {
                $set : {
                    "_lastLogin" : chatUserData.getLastLogin()
                }
            });
            return true;
        }
        catch(err){
            console.log("Error at updateuserLastLoginByEmailId() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    // update Chat User's verification status by the givem Email Id
    static async updateUserIsVerifiedByEmailId(chatUserEmailId : string) : Promise<void>{
        try{
            await DBConnection.getDb().collection(this._collectionName).updateOne({_emailId : chatUserEmailId}, {
                $set : {
                    "_isVerified" : true
                }
            });
        }
        catch(err){
            console.log("Error at updateUserIsVerifiedByEmailId() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    static async isUserVerified(chatUserEmailId : string) : Promise<boolean | null>{
        try{
            let chatUserDB = await this.findUserById(chatUserEmailId);
            if(!chatUserDB){
                return null;
            }
            return chatUserDB.getIsVerified();
        }
        catch(err){
            console.log("Error at updateUserIsVerifiedByEmailId() -> " + err);
            throw Errors.SERVER_DB_ERR;
        }
    }

    
}
