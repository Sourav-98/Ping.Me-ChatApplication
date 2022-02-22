
export default class ChatUserDTO {

    private _firstName : string;
    private _lastName : string;
    private _phoneNo : string;
    private _dateOfBirth : Date;
    private _emailId : string;
    private _password : string;
    private _accountCreationDate: Date;
    private _isVerified : boolean;
    private _lastLogin : Date;
    private _lastPasswordChange : Date;
    private _userRolesList : Array<string>;


    constructor({firstName = "", lastName = "", phoneNo = "", dateOfBirth = new Date(0), emailId = "", password = "", accountCreationDate = new Date(0), isVerified = false, lastLogin = new Date(0), lastPasswordChange = new Date(0), userRolesList = []}) {
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

    public setFirstName(firstName : string) : void{
        this._firstName = firstName;
    }

    public setLastName(lastName : string) : void{
        this._lastName = lastName;
    }

    public setDateOfBirth(dateOfBirth : Date) : void{
        this._dateOfBirth = dateOfBirth;
    }

    public setPhoneNo(phoneNo : string) : void{
        this._phoneNo = phoneNo;
    }

    public setEmailId(emailId : string) : void{
        this._emailId = emailId;
    }

    public setPassword(password : string) : void{
        this._password = password;
    }

    public setAccountCreationDate(accountCreationDate : Date) : void{
        this._accountCreationDate = accountCreationDate;
    }

    public setLastLogin(lastLogin : Date) : void{
        this._lastLogin = lastLogin;
    }

    public setLastPasswordChange(lastPasswordChange : Date) : void{
        this._lastPasswordChange = lastPasswordChange;
    }

    public setIsVerified(isVerified : boolean) : void{
        this._isVerified = isVerified;
    }

    public setUserRolesList(userRolesList : Array<string>) : void{
        this._userRolesList = userRolesList;
    }

    public getFirstName() : string{
        return this._firstName;
    }

    public getLastName() : string{
        return this._lastName;
    }

    public getDateOfBirth() : Date{
        return this._dateOfBirth;
    }

    public getPhoneNo() : string{
        return this._phoneNo;
    }

    public getEmailId() : string{
        return this._emailId;
    }

    public getPassword() : string{
        return this._password;
    }

    public getAccountCreationDate() : Date{
        return this._accountCreationDate;
    }

    public getLastLogin() : Date{
        return this._lastLogin;
    }

    public getLastPasswordChange() : Date{
        return this._lastPasswordChange;
    }

    public getIsVerified() : boolean{
        return this._isVerified;
    }

    public getUserRolesList() : Array<string>{
        return this._userRolesList;
    }
}
