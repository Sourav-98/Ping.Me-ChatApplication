"use strict";

export default class ChatUserDTO {

    constructor({firstName = undefined, lastName = undefined, phoneNo = undefined, dateOfBirth = undefined, emailId = undefined, password = undefined, isVerified = false, lastLogin = undefined, lastPasswordChange = undefined, userRolesList = undefined}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.dateOfBirth = dateOfBirth;
        this.emailId = emailId;
        this.password = password;
        this.isVerified = isVerified;
        this.lastLogin = lastLogin;
        this.lastPasswordChange = lastPasswordChange;
        this.userRolesList = userRolesList;
    }

    setFirstName(firstName){
        this.firstName = firstName;
    }

    setLastName(lastName){
        this.lastName = lastName;
    }

    setDateOfBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth;
    }

    setPhoneNo(phoneNo){
        this.phoneNo = phoneNo;
    }

    setEmailId(emailId){
        this.emailId = emailId;
    }

    setPassword(password){
        this.password = password;
    }

    setLastLogin(lastLogin){
        this.lastLogin = lastLogin;
    }

    setLastPasswordChange(lastPasswordChange){
        this.lastPasswordChange = lastPasswordChange;
    }

    setIsVerified(isVerified){
        this.isVerified = isVerified;
    }

    setUserRolesList(userRolesList){
        this.userRolesList = userRolesList;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getDateOfBirth(){
        return this.dateOfBirth;
    }

    getPhoneNo(){
        return this.phoneNo;
    }

    getEmailId(){
        return this.emailId;
    }

    getPassword(){
        return this.password;
    }

    getLastLogin(){
        return this.lastLogin;
    }

    getLastPasswordChange(){
        return this.lastPasswordChange;
    }

    getIsVerified(){
        return this.isVerified;
    }

    getUserRolesList(){
        return this.userRolesList;
    }
}