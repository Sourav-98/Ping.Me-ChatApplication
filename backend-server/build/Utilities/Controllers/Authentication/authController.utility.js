"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestParamsValid = void 0;
/** requestParamsCheck -> A Utility function to check the validity of the parameters being passed
 *  @param requestBody -> the form request body
 *  @param {Array<string>} paramsList -> the valid params list to tally with the requestBody
 *  @returns {boolean} true -> if valid
 *  @returns {boolean} false -> if invalid
 */

const isRequestParamsValid = (requestBody, paramsList) => {
  let keys = Object.keys(requestBody);

  if (keys.length !== paramsList.length) {
    return false;
  } else {
    for (let i = 0; i < paramsList.length; i++) {
      if (!requestBody[paramsList[i]] || requestBody[paramsList[i]] === '') {
        return false;
      }
    }
  }

  return true;
};

exports.isRequestParamsValid = isRequestParamsValid;