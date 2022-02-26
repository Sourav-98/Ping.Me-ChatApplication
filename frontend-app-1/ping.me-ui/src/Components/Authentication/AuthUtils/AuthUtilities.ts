
/** Auth Utilities - Contains all the frontend utility code like form input checking, etc */


/**
 * @description isFirstNameValid() -> checks the validity of the first name
 * @param {string} firstName
 * @returns {number} 0, if firstName is undefined or null
 * @returns {number} -1, if the firstName does not match the Regex pattern
 * @returns {number} 1, if the firstName is valid
 */
export function isFirstNameValid(firstName : string) : number{
    if(!firstName){
        return 0;
    }
    let firstNameRegex = /^[a-zA-Z]{3,}$/;  // Match a valid first name only
    if(!firstNameRegex.test(firstName)){
        return -1;
    }
    return 1;
}

/**
 * @description isLastNameValid() -> checks the validity of the last name
 * @param {string} lastName
 * @returns {number} 0, if lastName is undefined or null
 * @returns {number} -1, if the lastName does not match the Regex pattern
 * @returns {number} 1, if the lastName is valid
 */
export function isLastNameValid(lastName : string) : number{
    if(!lastName){
        return 0;
    }
    let lastNameRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/; // Match a valid last name only
    if(!lastNameRegex.test(lastName)){
        return -1;
    }
    return 1;
}

/**
 * @description isUserEmailIdValid() -> checks the validity of the user email id
 * @param {string} emailId
 * @returns {number} 0 -> if the emailId is null or undefined
 * @returns {number} -1 -> if the emailId does not match the Regex pattern
 * @returns {number} 1 -> if the emailId is valid
 */
export function isUserEmailIdValid(emailId : string) : number{
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

/**
 * @description isPasswordValid() -> checks the validity of the user password
 * @param {string} password
 * @returns {number} 0 -> if the password is null or undefined
 * @returns {number} 1 -> if the password is valid
 */
export function isPasswordValid(password : string) : number{
    if(!password){
        return 0;
    }
    return 1;
}

/**
 * @description isConfirmPasswordValid() -> checks the validity of the user confirm password
 * @param {string} confirmPassword
 * @param {string} password
 * @returns {number} 0 -> if the confirmPassword is null or undefined
 * @returns {number} -1 -> if the confirmPassword and password do not match
 * @returns {number} 1 -> if the confirmPassword matches the password
 */
export function isConfirmPasswordValid(confirmPassword : string, password : string) : number{
    if(!confirmPassword){
        return 0;
    }
    if(confirmPassword !== password){
        return -1;
    }
    return 1;
}
