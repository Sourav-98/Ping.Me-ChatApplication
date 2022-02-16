
const loginController = require('express').Router();
const loginService = require('./../../services/auth/login.service');

const ControllerUtility = require('./../Utilities/ControllerUtility');

const { AuthStatusEnums } = require('./../../util/statusCodes/AuthStatusEnums');

let asyncDelay = async(time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    })
}

loginController.get('/login', async(req, res) => {
    res.send(loginService.defaultLoginMessage());
})

loginController.post('/login', async(req, res) => {
    let userData = req.body;
    
    // check if valid data parameters was passed to the /login POST request
    let paramsList = [ 'emailId', 'password' ];
    if(!ControllerUtility.isRequestParamsValid(userData, paramsList)){
        res.status(400).send(JSON.stringify(AuthStatusEnums.REQUEST_FAIL_INVALID_PARAMETERS));
        return;
    }
    try{
        let loginServiceResult = await loginService.defaultUserLogin(userData);
        await asyncDelay(2000);
        switch(loginServiceResult){
            case -1: res.status(200).send(JSON.stringify(AuthStatusEnums.LOGIN_FAIL_INVALID_PASSWORD)); break;
            case 0: res.status(200).send(JSON.stringify(AuthStatusEnums.LOGIN_FAIL_INVALID_EMAIL_ID)); break;
            case 1: res.status(200).send(JSON.stringify(AuthStatusEnums.LOGIN_SUCCESS)); break;
            default: res.status(400).send(JSON.stringify({'blank' : 'blank'})); break;
        }
    }
    catch(err){
        await asyncDelay(1000);
        res.status(500).send(JSON.stringify({...AuthStatusEnums.LOGIN_FAIL_OTHER, 'err' : err}));
    }
});

module.exports = { loginController }
