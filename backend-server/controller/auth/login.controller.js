
const loginController = require('express').Router();
const loginService = require('./../../services/auth/login.service');

const authMiddleware = require('./auth.middleware');

loginController.post('/login', authMiddleware.userExistsMiddleware, async(req, res)=>{
    let userData = req.body;
});

module.exports = { loginController };
