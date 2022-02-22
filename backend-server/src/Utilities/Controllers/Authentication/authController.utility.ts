

/** requestParamsCheck -> A Utility function to check the validity of the parameters being passed
 *  @param requestBody -> the form request body
 *  @param paramsList -> the valid params list to tally with the requestBody
 *  @returns true -> if valid
 *  @returns false -> if invalid
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
