import express from 'express';
// const path = require('path');
// const bodyParser = require('body-parser');

const server = express();
// const appLogger = require('./logger/logger');

import loginController from './Controllers/Authentication/login.controller';
import registerController from './Controllers/Authentication/register.controller';
import emailVerifierController from './Controllers/Authentication/emailVerifier.controller';
import defaultController from './Controllers/default.controller';

server.use(express.urlencoded({extended: false}))
server.use(loginController);
server.use(registerController);
server.use(emailVerifierController);
server.use(defaultController);

export default server;
