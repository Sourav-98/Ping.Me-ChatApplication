
const Errors = {
    USER_EMAIL_ID_EXISTS_ERR: {
        err_code: 101040,
        err_message: "User Email Id already registered!",
        http_status_code: 401
    },
    USER_EMAIL_ID_DOES_NOT_EXIST_ERR: {
        err_code: 102404,
        err_message: "User Email Id not registered!",
        http_status_code: 400
    },
    USER_PASSWORD_INCORRECT_ERR:{
        err_code: 102401,
        err_message: "Invalid Password entered!",
        http_status_code: 401
    },
    SERVER_DOWNTIME_ERR:{
        err_code: 500009,
        err_message: "Server application exception...",
        http_status_code: 500
    },
    SERVER_DB_CONNECTION_ERR:{
        err_code: 501000,
        err_message: "DB Connection exception...",
        http_status_code: 500
    }
}

module.exports = { Errors }
