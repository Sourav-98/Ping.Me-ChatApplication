
import { Router, Request, Response } from 'express';

import { LoginFormBody } from 'Utilities/FormRequestTypes/formRequest.types';

const loginController = Router();

import * as loginService from 'Services/Authentication/login.service';

import * as ControllerUtility from 'Utilities/Controllers/Authentication/authController.utility';
import { ResponseEnums } from 'Utilities/Enums/ResponseEnums';

let asyncDelay = async(time : number) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    })
}

loginController.get('/login', async(req : Request, res : Response) : Promise<void> => {
    res.send(loginService.defaultLoginMessage());
})

// interface e.Request<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = QueryString.ParsedQs, Locals extends Record<string, any> = Record<string, any>>

loginController.post('/login', async(req : Request<{}, {}, LoginFormBody>, res : Response) : Promise<void> => {
    let userData : LoginFormBody = req.body;
    // check if valid data parameters was passed to the /login POST request
    let paramsList = [ 'emailId', 'password' ];
    if(!ControllerUtility.isRequestParamsValid(userData, paramsList)){
        res.status(400).send(JSON.stringify(ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS));
        return;
    }
    try{
        let loginServiceResult = await loginService.defaultUserLogin(userData);
        await asyncDelay(2000);
        switch(loginServiceResult){
            case -1: res.status(200).send(JSON.stringify(ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD)); break;
            case 0: res.status(200).send(JSON.stringify(ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID)); break;
            case 1: res.status(200).send(JSON.stringify(ResponseEnums.LOGIN_SUCCESS)); break;
            default: res.status(400).send(JSON.stringify({'blank' : 'blank'})); break;
        }
    }
    catch(err){
        await asyncDelay(1000);
        res.status(500).send(JSON.stringify({...ResponseEnums.LOGIN_FAIL_OTHER, 'err' : err}));
    }
});

export default loginController;
