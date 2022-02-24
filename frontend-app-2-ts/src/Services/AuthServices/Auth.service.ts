
import { ResponseEnums } from 'Services/Utilities/ResponseEnums';

async function formSubmit(url : string, formObject : any){
    let formBody = getUrlEncoded(formObject);
    return await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formBody
    });
}

function isJSONString(responseString : string){
    try{
        let jsonString = JSON.parse(responseString);
    }
    catch(err){
        console.log('Response is not a valid JSON string -> ' + err);
        return false;
    }
    return true;
}

function getUrlEncoded(formObject : any) : string{
    let formBody : Array<string> = [];
    for(let element in formObject){
        let key = encodeURIComponent(element);
        let value = encodeURIComponent(formObject[element]);
        formBody.push(key + "=" + value);
    }
    return formBody.join('&');
}

/** registerFormSubmit -> form submit handler for register request
 *  @param registerFormObject -> an object consisting of the registration data { firstName: , lastName: , emailId: , password: }
 *  @returns ResponseEnums, based on the specific responses from the backend
 */
export async function registerFormSubmit(registerFormObject : { firstName?: string, lastName?: string, emailId?: string, password?: string}) : Promise<{ status_code : number, status_message : string }>{
    let backendResponse = await formSubmit("/register", registerFormObject);
    console.log(backendResponse);
    let responseText = undefined;
    let responseJson = undefined;
    responseText = await backendResponse.text();
    if(isJSONString(responseText)){
        responseJson = JSON.parse(responseText);
    }
    if(backendResponse.ok){ // if backend response is OK (200), then responseJson will never be null
        switch(responseJson.status_code){
            case 1000: return ResponseEnums.REGISETER_SUCCESS;
            case 1001: return ResponseEnums.REGISTER_FAIL_EMAIL_ID_TAKEN;
            default: break;
        }
    }
    else if(backendResponse.status >= 400 && backendResponse.status < 500){
        switch(backendResponse.status){
            case 400: return ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS;
            case 404: // insert -> invalid url hit
            default: return ResponseEnums.REGISTER_FAIL_OTHER;
        }
    }
    else{
        switch(backendResponse.status){
            case 500:
                if(!responseJson){
                    return ResponseEnums.SERVER_CONN_ERR;
                }
                else{
                    switch(responseJson.err.err_code){
                        case 500009: 
                        case 501000: return ResponseEnums.SERVER_ERR;
                        default: return ResponseEnums.ANNONYMOUS_ERR; 
                    }
                }
            case 502:
            case 503:
            default: return ResponseEnums.ANNONYMOUS_ERR; 
        }
    }
    return ResponseEnums.REGISTER_FAIL_OTHER;
}


/** loginFormSubmit -> form submit handler for login request
 *  @param loginFormObject -> an object consisting of the login data { emailId: , password: }
 *  @returns ResponseEnums, based on the specific response from the backend
 */
export async function loginFormSubmit(loginFormObject : {emailId? : string, password? : string}) : Promise<{ status_code : number, status_message : string }>{
    let backendResponse = await formSubmit("/login", loginFormObject);
    console.log(backendResponse);
    let responseText = undefined;
    let responseJson = undefined;
    responseText = await backendResponse.text();
    if(isJSONString(responseText)){
        responseJson = JSON.parse(responseText);
    }
    if(backendResponse.ok){ // if backend response is OK (200), then responseJson will never be null
        switch(responseJson.status_code){
            case 2000: return ResponseEnums.LOGIN_SUCCESS;
            case 2001: return ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID;
            case 2002: return ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD;
            default: break;
        }
    }
    else if(backendResponse.status >= 400 && backendResponse.status < 500){
        switch(backendResponse.status){
            case 400: return ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS;
            case 404: // insert -> invalid url hit
            default: return ResponseEnums.LOGIN_FAIL_CLIENT_ERR;
        }
    }
    else{
        switch(backendResponse.status){
            case 500:
                if(!responseJson){
                    return ResponseEnums.SERVER_CONN_ERR;
                }
                else{
                    switch(responseJson.err.err_code){
                        case 500009: 
                        case 501000: return ResponseEnums.SERVER_ERR;
                        default: return ResponseEnums.ANNONYMOUS_ERR; 
                    }
                }
            case 502:
            case 503:
            default: return ResponseEnums.ANNONYMOUS_ERR; 
        }
    }
    return ResponseEnums.LOGIN_FAIL_OTHER;
}

export function passwordResetFormSubmit(passwordResetFormObject : any){

}
