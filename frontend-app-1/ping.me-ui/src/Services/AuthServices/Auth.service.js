
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
        status_message: "Registration Successful!"
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
    },
    SERVER_CONN_ERR: {
        status_code: 111111,
        status_message: "Server Connection Error!"
    }
}

async function formSubmit(url, formObject){
    let formBody = getUrlEncoded(formObject);
    return await fetch(url, {
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
        console.log('registerFormSubmit() response -> ');
        console.log(backendResponse);
        if(!backendResponse){   // no backend response received
            return responseStatusMessages.SERVER_CONN_ERR;
        }
        let responseJson = await backendResponse.json();
        if(backendResponse.status >= 200 && backendResponse.status < 300){
            switch(responseJson.status_code){
                case 1000: return responseStatusMessages.REGISTER_SUCCESS;
                case 1001: return responseStatusMessages.REGISTER_FAIL_EMAIL_ID_TAKEN;
            }
        }
        if(backendResponse.status >= 400){
            switch (responseJson.err.err_code){
                case 501000: 
                case 500009: return responseStatusMessages.SERVER_ERR;
                default: return responseStatusMessages.ANNONYMOUS_ERR;
            }
        }
    }
    catch(err){
        console.log('Exception at registerFormSubmit() -> ' + err);
        return responseStatusMessages.ANNONYMOUS_ERR;
    }
}

export async function loginFormSubmit(loginFormObject){
    try{
        let backendResponse = await formSubmit("/login", loginFormObject);
        console.log('loginFormSubmit() response -> ');
        console.log(backendResponse);
        if(!backendResponse){   // no backend response received
            return responseStatusMessages.SERVER_CONN_ERR;
        }
        let responseJson = await backendResponse.json();
        if(backendResponse.status >= 200 && backendResponse.status < 300){
            switch(responseJson.status_code){
                case 2000: return responseStatusMessages.LOGIN_SUCCESS;
                case 2001: return responseStatusMessages.LOGIN_FAIL_INVALID_EMAIL_ID
                case 2002: return responseStatusMessages.LOGIN_FAIL_INVALID_PASSWORD;
            }
        }
        if(backendResponse.status >= 400){
            switch (responseJson.err.err_code){
                case 501000: 
                case 500009: return responseStatusMessages.SERVER_ERR;
                default: return responseStatusMessages.ANNONYMOUS_ERR;
            }
        }
    }
    catch(err){
        console.log('Exception at registerFormSubmit() -> ' + err);
        return responseStatusMessages.ANNONYMOUS_ERR;
    }
}

export function passwordResetFormSubmit(passwordResetFormObject){

}
