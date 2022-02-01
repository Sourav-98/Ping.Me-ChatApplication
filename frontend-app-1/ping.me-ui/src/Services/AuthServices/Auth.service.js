
const responseStatusMessages = {
    LOGIN_SUCCESS: {
        status_code: 102000,
        status_message: "Successful Login"
    },
    LOGIN_FAIL_INVALID_EMAIL_ID: {
        status_code: 102101,
        status_message: "Login Failed! Invalid Email Id"
    },
    LOGIN_FAIL_INVALID_PASSWORD: {
        status_code: 102121,
        status_message: "Login Failed! Invalid Password"
    },
    LOGIN_FAIL_OTHER: {
        status_code: 102111,
        status_message: "Login Failed! Other issue occured"
    },
    REGISTER_SUCCESS: {
        status_code: 202100,
        status_message: "Successful Registration!"
    },
    REGISTER_FAIL_EMAIL_ID_TAKEN: {
        status_code: 202101,
        status_message: "Registration Failed! Email Id taken."
    },
    REGISTER_FAIL_OTHER: {
        status_code: 202111,
        status_message: "Registration Failed! Other issue occured"
    },
    SERVER_ERR: {
        status_code: 999999,
        status_message: "Server Error"
    },
    ANNONYMOUS_ERR: {
        status_code: 555555,
        status_message: "Annonymous Error!"
    }
}

async function formSubmit(url, formObject){
    let formBody = getUrlEncoded(formObject);
    return fetch(url, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formBody
    });
}

function getUrlEncoded(formObject){
    let formBody = [];
    for(let element in formObject){
        let key = encodeURIComponent(element);
        let value = encodeURIComponent(formObject[element]);
        formBody.push(key + "=" + value);
    }
    formBody = formBody.join('&');
    return formBody;
}

export async function registerFormSubmit(registerFormObject){
    try{
        let backendResponse = await formSubmit("/register", registerFormObject);
        console.log(backendResponse);
        // if an internal server error occured - server unable to process any requests
        if(backendResponse.status >= 500){
            return responseStatusMessages.SERVER_ERR;
        }
        let responseJson = await backendResponse.json();
        console.log("Register Response -> " + JSON.stringify(responseJson));
        if(backendResponse.status === 200){
            return responseStatusMessages.REGISTER_SUCCESS;
        }
        // if the response is an error response
        if(backendResponse.status >= 400){
            switch(responseJson.err_code){
                case 101040: return responseStatusMessages.REGISTER_FAIL_EMAIL_ID_TAKEN;
                default : return responseStatusMessages.REGISTER_FAIL_OTHER;
            }
        }
        return responseJson;
    }
    catch(err){
        console.log(err);
        // throw err;
    }

}

export async function loginFormSubmit(loginFormObject){
    try{
        let backendResponse = await formSubmit("/login", loginFormObject);
        console.log(backendResponse);
        if(backendResponse.status >= 500){
            return responseStatusMessages.SERVER_ERR;
        }
        let responseJson = await backendResponse.json();
        console.log("Login Response -> " + JSON.stringify(responseJson));
        if(backendResponse.status === 200){
            return responseStatusMessages.LOGIN_SUCCESS;
        }
        if(backendResponse.status >= 400){
            switch(responseJson.err_code){
                case 102401: return responseStatusMessages.LOGIN_FAIL_INVALID_PASSWORD;
                case 102404: return responseStatusMessages.LOGIN_FAIL_INVALID_EMAIL_ID;
                default: return responseStatusMessages.LOGIN_FAIL_OTHER;
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

export function passwordResetFormSubmit(passwordResetFormObject){

}
