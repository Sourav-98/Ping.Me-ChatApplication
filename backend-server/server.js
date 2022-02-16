const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// const appLogger = require('./logger/logger');

// const { loginController } = require('Controllers/Authentication/login.controller');
import loginController from 'Controllers/Authentication/login.controller';
import registerController from 'Controllers/Authentication/register.controller';
import defaultController from 'Controllers/default.controller';

app.use(express.urlencoded({extended: false}))
app.use(loginController);
app.use(registerController);
app.use(defaultController);

module.exports = { app };
