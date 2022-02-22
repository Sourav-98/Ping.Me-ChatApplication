"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserRegistration = exports.defaultRegisterService = void 0;

const ChatUserDAO_1 = __importDefault(require("../../Repositories/ChatUserDAO"));

const ChatUserDTO_1 = __importDefault(require("../../Models/ChatUserDTO")); // const bcrypt = require('bcrypt');


const bcrypt_1 = __importDefault(require("bcrypt"));

const defaultMessage = {
  service: "Register Service",
  message: "The service responsible for creating new users"
};
/** defaultRegistrationService
 * a dummy registration service for /register GET method
 */

const defaultRegisterService = async function () {
  return defaultMessage;
};

exports.defaultRegisterService = defaultRegisterService;
/** newUserRegistration service
 * called when a new user is being created
 * returns 1 if the user is successfully created in the db
 * returns 0 if the user email id already exists in the db
 * returns -1 if the user email id is an invalid email id
 * throws any execution error, if any
 */

const newUserRegistration = async function (userData) {
  let user = new ChatUserDTO_1.default({
    firstName: userData.firstName,
    lastName: userData.lastName,
    emailId: userData.emailId,
    password: userData.password
  });

  try {
    // check if the user already exists
    let dbSearchUserResult = await ChatUserDAO_1.default.findUserById(user.getEmailId());

    if (dbSearchUserResult) {
      /** Password Recovery Option -> to be implemented
       *  If the user email id exists, redirect to forgot password (or) account recovery
       */
      return -1;
    }
    /** User can now be inserted */


    user.setPassword(await bcrypt_1.default.hash(user.getPassword(), 10));
    await ChatUserDAO_1.default.insertNewUser(user);
    return 1;
  } catch (err) {
    console.log("Error at newUserRegistration() service -> " + JSON.stringify(err));
    throw err;
  }
};

exports.newUserRegistration = newUserRegistration;