
const registerController = require('express').Router();
const registerService = require('./../../services/auth/register.service');

registerController.get('/register-dummy', async(req, res) => {
    let responseData = await registerService.defaultRegisterService();
    res.send(responseData);
});

registerController.post('/register', async(req, res) => {
    let userData = req.body;
    console.log(userData);
    // let responseData = await registerService.newUserRegistration()
    res.send({ 'status' : 'OK'});
})

module.exports = { registerController };
