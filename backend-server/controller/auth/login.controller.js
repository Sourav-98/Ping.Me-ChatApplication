
const loginController = require('express').Router();
const loginService = require('./../../services/auth/login.service');

// const authMiddleware = require('./auth.middleware');

loginController.get('/login', async(req, res) => {
    res.send(loginService.defaultLoginMessage());
})

loginController.post('/login', async(req, res) => {
    let userData = req.body;
    try{
        let isAuthenticated = await loginService.defaultUserLogin(userData);
        if(isAuthenticated){
            res.status(200).send({
                status_code : 200,
                status_message : "User Authenticated"
            })
        }
        else{
            res.status(401).send({
                status_code : 401,
                status_message : "User Not Authenticated"
            });
        }
    }
    catch(err){
        res.status(err.http_status_code).send(err);
    }
    
});

module.exports = { loginController }
