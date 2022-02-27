
export interface LoginFormBody {
    emailId : string,
    password : string
}

export interface RegisterFormBody {
    firstName : string,
    lastName : string,
    emailId : string,
    password : string
}

export interface EmailVerfierFormBody { 
    emailId : string,
    token : string,
    tokenDate : Date
}
