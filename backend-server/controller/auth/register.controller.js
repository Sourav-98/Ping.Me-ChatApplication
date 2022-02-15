
const registerController = require('express').Router();
const registerService = require('./../../services/auth/register.service');

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
    console.log(userData);
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
