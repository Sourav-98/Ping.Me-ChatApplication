

/** requestParamsCheck -> A Utility function to check the validity of the parameters being passed
 *  @param requestBody -> the form request body
 *  @param {Array<string>} paramsList -> the valid params list to tally with the requestBody
 *  @returns {boolean} true -> if valid
 *  @returns {boolean} false -> if invalid
 */
export const isRequestParamsValid = (requestBody : any, paramsList : Array<any>) : boolean => {
    let keys = Object.keys(requestBody);
    if(keys.length !== paramsList.length){
        return false;
    }
    else{
        for(let i = 0; i < paramsList.length; i++){
            if(!requestBody[paramsList[i]] || requestBody[paramsList[i]] === ''){
                return false;
            }
        }
    }
    return true;
}

export const isRequestParamsValidv2 = (requestBody : any) : boolean => {
    let keys = Object.keys(requestBody);
    for(let i = 0; i < keys.length; i++){
        if(!requestBody[i]){    // if any one of the parameters is undefined, then return false
            return false;
        }
    }
    return true;
}
