const express = require('express');
const routes = express.Router();

const loginController = require('../../controller/auth/loginController');
const registerController = require('../../controller/auth/registerController');

routes.post('/login');
routes.post('/passport-login-google');
routes.post('/passport-login-facebook');
routes.post('/passport-login-twitter');

routes.post('/register');
routes.post('/password-reset');

module.exports = routes;
