"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isRequestParamsValid=void 0;/** requestParamsCheck -> A Utility function to check the validity of the parameters being passed
 *  @param requestBody -> the form request body
 *  @param {Array<string>} paramsList -> the valid params list to tally with the requestBody
 *  @returns {boolean} true -> if valid
 *  @returns {boolean} false -> if invalid
 */const isRequestParamsValid=(a,b)=>{let c=Object.keys(a);if(c.length!==b.length)return!1;for(let c=0;c<b.length;c++)if(!a[b[c]]||""===a[b[c]])return!1;return!0};exports.isRequestParamsValid=isRequestParamsValid;