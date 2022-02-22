
export default class ChatUserDTO {

    private firstName : string;
    private lastName : string;
    private phoneNo : string;
    private dateOfBirth : Date;
    private emailId : string;
    private password : string;
    private isVerified : boolean;
    private lastLogin : Date;
    private lastPasswordChange : Date;
    private userRolesList : Array<string>;


    constructor({firstName = "", lastName = "", phoneNo = "", dateOfBirth = new Date(), emailId = "", password = "", isVerified = false, lastLogin = new Date(), lastPasswordChange = new Date(), userRolesList = []}) {
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

    setFirstName(firstName : string){
        this.firstName = firstName;
    }

    setLastName(lastName : string){
        this.lastName = lastName;
    }

    setDateOfBirth(dateOfBirth : Date){
        this.dateOfBirth = dateOfBirth;
    }

    setPhoneNo(phoneNo : string){
        this.phoneNo = phoneNo;
    }

    setEmailId(emailId : string){
        this.emailId = emailId;
    }

    setPassword(password : string){
        this.password = password;
    }

    setLastLogin(lastLogin : Date){
        this.lastLogin = lastLogin;
    }

    setLastPasswordChange(lastPasswordChange : Date){
        this.lastPasswordChange = lastPasswordChange;
    }

    setIsVerified(isVerified : boolean){
        this.isVerified = isVerified;
    }

    setUserRolesList(userRolesList : Array<string>){
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
