
const AuthResponseEnums = {
    REGISETER_SUCCESS: {
        status_code: 1000,
        status_message: 'User Registration Successful'
    },
    REGISTER_FAIL_EMAIL_ID_TAKEN: {
        status_code: 1001,
        status_message: 'User Registration Failed - Email Id taken'
    },
    REGISTER_FAIL_INVALID_EMAIL_ID: {
        status_code: 1002,
        status_message: 'User Registration Failed - Email Id invalid'
    },
    REGISTER_FAIL_OTHER: {
        status_code: 1099,
        status_message: 'User Registration Failed - Other'
    },
    LOGIN_SUCCESS: {
        status_code: 2000,
        status_message: 'User Login Successful'
    },
    LOGIN_FAIL_INVALID_EMAIL_ID: {
        status_code: 2001,
        status_message: 'User Login Failed - Email Id invalid'
    },
    LOGIN_FAIL_INVALID_PASSWORD: {
        status_code: 2002,
        status_message: 'User Login Failed - Password invalid'
    },
    LOGIN_FAIL_USER_EMAIL_ID_NOT_VERIFIED : {
        status_code : 2011,
        status_message : 'User Login Failed - User Email Id not verified'
    },
    LOGIN_FAIL_OTHER: {
        status_code: 2099,
        status_message: 'User Login Failed - Other'
    },
    LOGIN_FAIL_CLIENT_ERR: {
        status_code: 2400,
        status_message: 'User Login Failed - Client Side Error'
    },
    USER_EMAIL_ID_VERIFICATION_SUCCESS: {
        status_code: 3000,
        status_message: 'User Email Verification Successful'
    },
    USER_EMAIL_ID_VERIFICATION_FAIL_INVALID_TOKEN: {
        status_code: 3001,
        status_message: 'User Email Verification Failed - Invalid Token'
    },
    USER_EMAIL_ID_VERIFICATION_FAIL_EXPIRED_TOKEN: {
        status_code : 3002,
        status_message : 'User Email Verification Failed - Token Expired'
    },
    USER_EMAIL_ID_VERIFICATION_FAIL_OTHER : {
        status_code : 3111,
        status_message : 'User Email Verification Failed - Other Error'
    },
    USER_EMAIL_ID_VERIFICATION_FAIL_CLIENT_ERR: {
        status_code: 2400,
        status_message: 'User Login Failed - Client Side Error'
    },
    USER_PASSWORD_RESET_SUCCESS: {
        status_code: 4000,
        status_message: 'User Password Reset Successful'
    },
    USER_PASSWORD_RESET_FAIL_TOKEN_INVALID: {
        status_code: 4001,
        status_message: 'User Password Reset Failed - Invalid Reset Token'
    }
}

const ServerErrorEnums = {
    REQUEST_FAIL_INVALID_PARAMETERS: {
        status_code: 9400,
        status_message: 'User Login Failed - Invalid Request Parameters'
    },
    SERVER_ERR: {
        status_code: 9999,
        status_message: "Server Error"
    },
    ANNONYMOUS_ERR: {
        status_code: 5555,
        status_message: "Annonymous Error!"
    },
    SERVER_CONN_ERR: {
        status_code: 1111,
        status_message: "Server Connection Error!"
    }
}

export const ResponseEnums = {...AuthResponseEnums, ...ServerErrorEnums}
