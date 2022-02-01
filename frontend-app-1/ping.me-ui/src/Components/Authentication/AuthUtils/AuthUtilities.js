
/** Auth Utilities - Contains all the frontend utility code like form input checking, etc */


/** isFirstNameValid -> checks the validity of the first name
 * param - firstName -> entered by the user
 * returns 0 if the firstName is null or undefined
 * returns -1 if the firstName is not valid
 * returns 1 if firstName is valid
 */
export function isFirstNameValid(firstName){
    if(!firstName){
        return 0;
    }
    let firstNameRegex = /^[a-zA-Z]{3,}$/;  // Match a valid first name only
    if(!firstNameRegex.test(firstName)){
        return -1;
    }
    return 1;
}

/** isLastNameValid -> checks the validity of the last name
 * param - lastName -> entered by the user
 * returns 0 if the lastName is null or undefined
 * returns -1 if the lastName is not valid
 * returns 1 if lastName is valid
 */
export function isLastNameValid(lastName){
    if(!lastName){
        return 0;
    }
    let lastNameRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/; // Match a valid last name only
    if(!lastNameRegex.test(lastName)){
        return -1;
    }
    return 1;
}

/** isEmailIdValid -> checks the validity of the user email id
 * param - emailId -> entered by the user
 * returns 0 if the emailId is null or undefined
 * returns -1 if the emailId is not valid
 * returns 1 if the emailId is valid
 */
export function isUserEmailIdValid(emailId){
    if(!emailId){
        return 0;
    }
    // Email Regex
    let emailRegex = /[a-zA-Z0-9\._]+@[a-z]{3,10}\.[a-z]{2,5}/s;
    if(!emailRegex.test(emailId)){
        return -1;
    }
    return 1;
}

/** isPasswordValid -> checks the validity of the user password
 * param - password -> entered by the user
 * returns 0 if the password is null or undefined
 * returns 1 if the password is valid
 */
export function isPasswordValid(password){
    if(!password){
        return 0;
    }
    return 1;
}

/** isConfirmPasswordValid -> checks the validity of the user confirm password
 * param - confirmPassword, password -> entered by the user
 * returns 0 if the confirmPassword is null or undefined
 * returns -1 if the confirmPassword doesnot match with the password
 * returns 1 if the confirmPassword is the same as the password
 */
export function isConfirmPasswordValid(confirmPassword, password){
    if(!confirmPassword){
        return 0;
    }
    if(confirmPassword !== password){
        return -1;
    }
    return 1;
}
