"use strict";var __importDefault=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(exports,"__esModule",{value:!0});const ChatUserDTO_1=__importDefault(require("../Models/ChatUserDTO")),dbConn_utility_1=__importDefault(require("../Utilities/DB/dbConn.utility")),errorCodes_1=require("../Utilities/Enums/errorCodes/errorCodes");// Basic Chat User CRUD Operation + Additional user fetches operations
class ChatUserDAO{/** ChatUserDAO - The Data Access Object for the chat-users collection
     *  List of functions:
     *  0. findAllUsers()
     *  1. findUserById()
     *  2. insertNewUser()
     *  3. deleteUserByEmailId()
     *  4. updateUserDataByEmailId()
     *  5. updateUserPasswordByEmailId()
     *  6. updateUserLastLoginByEmailId()
     *  7. updateUserIsVerifiedByEmailId()
     */static async findAllUsers(){console.log("ChatUser DAO >> findAllUsers() -------------");try{let a=await dbConn_utility_1.default.getDb().collection(this._collectionName).find().toArray(),b=[];return a.map(a=>{b.push(new ChatUserDTO_1.default({firstName:a.firstName,lastName:a.lastName,emailId:a.emailId,password:a.password}))}),b}catch(a){throw console.log("Error at findAll() -> "+a),errorCodes_1.Errors.SERVER_DB_ERR}}/**
     *  @function findUserById
     *  @description : finds a chat user from the collection, given the user's email id
     *  @param {string} chatUserEmailId
     *  @returns {ChatUserDTO} chatUserDTO : if there exists a chat user
     *  @returns {null} : if no user is found
     *  @throws {Errors.SERVER_DB_ERR} : if any
     */static async findUserById(a){console.log("ChatUser DAO >> findUserById() -------------");try{let b,c=await dbConn_utility_1.default.getDb().collection(this._collectionName).findOne({emailId:a});// returns a single object
return c?(b=new ChatUserDTO_1.default({firstName:c.firstName,lastName:c.lastName,emailId:c.emailId,password:c.password}),console.log(b),b):b}catch(a){throw console.log("Error at findUserById() -> "+a),errorCodes_1.Errors.SERVER_DB_ERR}}// Insert a new Chat User given the user details
// return true if user successfully entered
// throw error if any
static async insertNewUser(a){console.log("ChatUser DAO >> insertNewUser() -------------");try{let b=await dbConn_utility_1.default.getDb().collection(this._collectionName).insertOne(a);return console.log("User Inserted >> "+JSON.stringify(b)),!0}catch(a){throw console.log("Error at insertNewUser() -> "+a),errorCodes_1.Errors.SERVER_DB_ERR}}// delete an existing Chat User by the given Email Id
static async deleteUserByEmailId(a){try{return await dbConn_utility_1.default.getDb().collection(this._collectionName).deleteOne({emailId:a}),!0}catch(a){throw console.log("Error at deleteUserAccount() -> "+a),errorCodes_1.Errors.SERVER_DB_ERR}}// update the details of a Chat User by the given Email Id
static async updateUserDataByEmailId(a){try{return await dbConn_utility_1.default.getDb().collection(this._collectionName).updateOne({emailId:a.getEmailId()},{$set:{firstName:a.getFirstName(),lastName:a.getLastName(),rolesList:a.getUserRolesList()}}),!0}catch(a){throw console.log("Error at updateUserDetails() -> "+a),a}}// update the Password of a Chat User by the given Email Id
static async updateUserPasswordByEmailId(a){try{await dbConn_utility_1.default.getDb().collection(this._collectionName).updateOne({emailId:a.getEmailId()},{$set:{password:a.getPassword(),lastPasswordChange:a.getLastPasswordChange()}})}catch(a){throw console.log("Error at updateUserPasswordByEmailId() -> "+a),a}}// update Chat User's last login status by the give Email Id
static async updateUserLastLoginByEmailId(a){try{return await dbConn_utility_1.default.getDb().collection(this._collectionName).updateOne({emailId:a.getEmailId()},{$set:{lastLogin:a.getLastLogin()}}),!0}catch(a){throw console.log("Error at updateuserLastLoginByEmailId() -> "+a),a}}// update Chat User's verification status by the givem Email Id
static async updateUserIsVerifiedByEmailId(a){try{await dbConn_utility_1.default.getDb().collection(this._collectionName).updateOne({emailId:a},{$set:{isVerified:!0}})}catch(a){throw console.log("Error at updateUserIsVerifiedByEmailId() -> "+a),a}}}// MongoDB Collection Name for ChatUserDAO
exports.default=ChatUserDAO,ChatUserDAO._collectionName="chat-users";