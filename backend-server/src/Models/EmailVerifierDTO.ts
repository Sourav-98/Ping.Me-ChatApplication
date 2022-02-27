
export default class EmailVerifierDTO{
    private _emailId : string = '';
    private _token : string = '';
    private _tokenDate : Date = new Date(0);

    constructor({emailId = '', token = '', tokenDate = new Date(0)}){
        this._emailId = emailId;
        this._token = token;
        this._tokenDate = tokenDate;
    }

    public getEmailId(){
        return this._emailId;
    }

    public getToken(){
        return this._token;
    }

    public getTokenDate(){
        return this._tokenDate
    }

    public setEmailId(emailId : string){
        this._emailId = emailId;
    }

    public setToken(token : string){
        this._token = token;
    }

    public setTokenDate(tokenDate : Date){
        this._tokenDate = tokenDate;
    }
}
