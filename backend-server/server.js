const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const appLogger = require('./logger/logger');

const { loginController } = require('./controller/auth/login.controller');
const { registerController } = require('./controller/auth/register.controller');
const { defaultController } = require('./controller/default.controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', loginController);
app.use(registerController);
app.use(defaultController);

module.exports = { app };
