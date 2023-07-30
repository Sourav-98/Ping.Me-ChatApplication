// login service - provides authentication service for a Chat User Login
import bcrypt from "bcrypt";

import ChatUserDAO from "../../Repositories/ChatUserDAO";
import ChatUserDTO from "../../Models/ChatUserDTO";

import * as AppStatusCodes from "../../Utilities/Enums/StatusCodes/StatusCodes";

const defaultMessage = {
  service: "Login Service",
  message: "The service for providing authentication...",
};

export const defaultLoginMessage = function () {
  return defaultMessage;
};

/**
 * @description defaultUserLogin service - used to login a new user
 * @returns {number} 1 if login is successful
 * @returns {number} 0 if the user email id is not registered
 * @returns {number} -1 if the user password entered does not match the password in the db
 * @returns {number} -11 - if the user's email id is not verified
 * @throws exception if any
 */
export const defaultUserLogin = async function (
  userCredentials: any
): Promise<string> {
  try {
    console.log("defaultUserLogin() service ->");
    let loginUser: ChatUserDTO | null = await ChatUserDAO.findUserById(
      userCredentials.emailId
    );
    if (!loginUser) {
      return AppStatusCodes.USER_LOGIN_FAIL_USER_NOT_REGISTERED;
    }
    if (!loginUser.getIsVerified()) {
      // console.log('User Email Id not verified!');
      return AppStatusCodes.USER_LOGIN_FAIL_USER_NOT_VERIFIED;
    }
    if (
      !(await bcrypt.compare(
        userCredentials.password,
        loginUser.getPassword() || ""
      ))
    ) {
      console.log("Invalid User Password");
      return AppStatusCodes.USER_LOGIN_FAIL_USER_INVALID_PASSWORD;
    }
    console.log("Valid Credentials");
    return AppStatusCodes.USER_LOGIN_SUCCESS;
  } catch (err) {
    console.log("Error at defaultUserLogin() -> " + JSON.stringify(err));
    throw err;
  }
};

export const apiLogin = () => {};

export const emailVerification = async function (userEmailId: string) {
  try {
    return await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
  } catch (err) {
    console.log(err);
  }
};
