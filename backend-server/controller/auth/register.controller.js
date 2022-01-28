
const registerController = require('express').Router();
const registerService = require('./../../services/auth/register.service');

let asyncDelay = async(time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    })
}

registerController.get('/register-dummy', async(req, res) => {
    let responseData = await registerService.defaultRegisterService();
    res.send(responseData);
});

registerController.post('/register', async(req, res) => {
    let userData = req.body;
    console.log(userData);
    // console.log('Sent Response');
    try{
        let responseData = await registerService.newUserRegistration(userData);
        if(responseData == true){
            await asyncDelay(1000);
            res.send({ 'message' : 'User Added' });
        }
        else{
            await asyncDelay(1000);
            res.send({ 'message' : 'User Not Added' });
        }
    }
    catch(err){
        await asyncDelay(1000);
        res.status(err.http_status_code).send(err);
    }
    // let responseData = await registerService.newUserRegistration()
})

module.exports = { registerController };
