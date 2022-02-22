
import {Request, Response, NextFunction} from 'express';

export const appLogger = function(req : Request, res : Response, next : NextFunction){
    let url = req.url;
    let ip = req.ip;
    let method = req.method;
    let dateTime = new Date();
    console.log("[" + dateTime.toISOString()+ "] - " + ip + " made a " + method + " request on URL=" + url);
    next();
}

// module.exports = appLogger;
