"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ChatUserDTO {
  constructor({
    firstName = "",
    lastName = "",
    phoneNo = "",
    dateOfBirth = new Date(0),
    emailId = "",
    password = "",
    accountCreationDate = new Date(0),
    isVerified = false,
    lastLogin = new Date(0),
    lastPasswordChange = new Date(0),
    userRolesList = []
  }) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._phoneNo = phoneNo;
    this._dateOfBirth = dateOfBirth;
    this._emailId = emailId;
    this._password = password;
    this._accountCreationDate = accountCreationDate;
    this._isVerified = isVerified;
    this._lastLogin = lastLogin;
    this._lastPasswordChange = lastPasswordChange;
    this._userRolesList = userRolesList;
  }

  setFirstName(firstName) {
    this._firstName = firstName;
  }

  setLastName(lastName) {
    this._lastName = lastName;
  }

  setDateOfBirth(dateOfBirth) {
    this._dateOfBirth = dateOfBirth;
  }

  setPhoneNo(phoneNo) {
    this._phoneNo = phoneNo;
  }

  setEmailId(emailId) {
    this._emailId = emailId;
  }

  setPassword(password) {
    this._password = password;
  }

  setAccountCreationDate(accountCreationDate) {
    this._accountCreationDate = accountCreationDate;
  }

  setLastLogin(lastLogin) {
    this._lastLogin = lastLogin;
  }

  setLastPasswordChange(lastPasswordChange) {
    this._lastPasswordChange = lastPasswordChange;
  }

  setIsVerified(isVerified) {
    this._isVerified = isVerified;
  }

  setUserRolesList(userRolesList) {
    this._userRolesList = userRolesList;
  }

  getFirstName() {
    return this._firstName;
  }

  getLastName() {
    return this._lastName;
  }

  getDateOfBirth() {
    return this._dateOfBirth;
  }

  getPhoneNo() {
    return this._phoneNo;
  }

  getEmailId() {
    return this._emailId;
  }

  getPassword() {
    return this._password;
  }

  getAccountCreationDate() {
    return this._accountCreationDate;
  }

  getLastLogin() {
    return this._lastLogin;
  }

  getLastPasswordChange() {
    return this._lastPasswordChange;
  }

  getIsVerified() {
    return this._isVerified;
  }

  getUserRolesList() {
    return this._userRolesList;
  }

}

exports.default = ChatUserDTO;