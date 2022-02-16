
const registerController = require('express').Router();
const registerService = require('./../../services/auth/register.service');

const ControllerUtility = require('./../Utilities/ControllerUtility');
const { AuthStatusEnums } = require('./../../util/statusCodes/AuthStatusEnums');

let asyncDelay = async(time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    })
}

registerController.get('/register', async(req, res) => {
    let responseData = await registerService.defaultRegisterService();
    await asyncDelay(2000);
    res.send(responseData);
});


registerController.post('/register', async(req, res) => {
    let userData = req.body;

    // check if valid data parameters was passed to the /register POST request
    let paramsList = ['firstName', 'lastName', 'emailId', 'password'];
    if(!ControllerUtility.isRequestParamsValid(userData, paramsList)){
        res.status(400).send(JSON.stringify(AuthStatusEnums.REQUEST_FAIL_INVALID_PARAMETERS));
        return;
    }
    try{
        let registerServiceResult = await registerService.newUserRegistration(userData);
        await asyncDelay(1650);
        switch (registerServiceResult){
            case -1: res.send(JSON.stringify(AuthStatusEnums.REGISTER_FAIL_EMAIL_ID_TAKEN)); break;
            case 0: res.send(JSON.stringify(AuthStatusEnums.REGISTER_FAIL_INVALID_EMAIL_ID)); break;
            case 1: res.send(JSON.stringify(AuthStatusEnums.REGISETER_SUCCESS)); break;
            default: res.send(JSON.stringify({'blank' : 'blank'}));
        }
    }
    catch(err){
        res.status(500).send(JSON.stringify({...AuthStatusEnums.REGISTER_FAIL_OTHER, 'err' : err}));
    }
    
})

module.exports = { registerController };
