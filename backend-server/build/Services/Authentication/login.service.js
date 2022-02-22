"use strict"; // login service - provides authentication service for a Chat User Login

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailVerification = exports.defaultUserLogin = exports.defaultLoginMessage = void 0;

const ChatUserDAO_1 = __importDefault(require("../../Repositories/ChatUserDAO"));

const bcrypt_1 = __importDefault(require("bcrypt"));

const defaultMessage = {
  service: "Login Service",
  message: "The service for providing authentication..."
};

const defaultLoginMessage = function () {
  return defaultMessage;
};

exports.defaultLoginMessage = defaultLoginMessage;
/** defaultUserLogin service - used to login a new user
 * returns 1 if login is successful
 * returns 0 if the user email id is not registered
 * returns -1 if the user password entered does not match the password in the db
 * throws exception if any
 */

const defaultUserLogin = async function (userCredentials) {
  try {
    console.log("defaultUserLogin() service ->");
    let loginUser = await ChatUserDAO_1.default.findUserById(userCredentials.emailId);

    if (!loginUser) {
      console.log('User doesnot exist');
      return 0;
    }

    if (!(await bcrypt_1.default.compare(userCredentials.password, loginUser.getPassword() || ''))) {
      console.log('Invalid User Password');
      return -1;
    }

    console.log('Valid Credentials');
    return 1;
  } catch (err) {
    console.log('Error at defaultUserLogin() -> ' + JSON.stringify(err));
    throw err;
  }
};

exports.defaultUserLogin = defaultUserLogin;

const emailVerification = async function (userEmailId) {
  try {
    return await ChatUserDAO_1.default.updateUserIsVerifiedByEmailId(userEmailId);
  } catch (err) {
    console.log(err);
  }
};

exports.emailVerification = emailVerification;