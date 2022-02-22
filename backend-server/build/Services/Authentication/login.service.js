"use strict";// login service - provides authentication service for a Chat User Login
var __importDefault=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.emailVerification=exports.defaultUserLogin=exports.defaultLoginMessage=void 0;const ChatUserDAO_1=__importDefault(require("../../Repositories/ChatUserDAO")),bcrypt_1=__importDefault(require("bcrypt")),defaultMessage={service:"Login Service",message:"The service for providing authentication..."},defaultLoginMessage=function(){return defaultMessage};exports.defaultLoginMessage=defaultLoginMessage;/** defaultUserLogin service - used to login a new user
 * returns 1 if login is successful
 * returns 0 if the user email id is not registered
 * returns -1 if the user password entered does not match the password in the db
 * throws exception if any
 */const defaultUserLogin=async function(a){try{console.log("defaultUserLogin() service ->");let b=await ChatUserDAO_1.default.findUserById(a.emailId);return b?(await bcrypt_1.default.compare(a.password,b.getPassword()||""))?(console.log("Valid Credentials"),1):(console.log("Invalid User Password"),-1):(console.log("User doesnot exist"),0)}catch(a){throw console.log("Error at defaultUserLogin() -> "+JSON.stringify(a)),a}};exports.defaultUserLogin=defaultUserLogin;const emailVerification=async function(a){try{return await ChatUserDAO_1.default.updateUserIsVerifiedByEmailId(a)}catch(a){console.log(a)}};exports.emailVerification=emailVerification;