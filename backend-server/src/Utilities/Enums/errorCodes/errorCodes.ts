
export const Errors = {
    USER_EMAIL_ID_EXISTS_ERR: {
        err_code: 101040,
        err_message: "User Email Id already registered!"
    },
    USER_EMAIL_ID_DOES_NOT_EXIST_ERR: {
        err_code: 102404,
        err_message: "User Email Id not registered!"
    },
    USER_PASSWORD_INCORRECT_ERR:{
        err_code: 102401,
        err_message: "Invalid Password entered!"
    },
    SERVER_DOWNTIME_ERR:{
        err_code: 500009,
        err_message: "Server application exception..."
    },
    SERVER_DB_ERR:{
        err_code: 501000,
        err_message: "DB Exception..."
    }
}
