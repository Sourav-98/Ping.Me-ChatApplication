const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const appLogger = require('./logger/logger');

const { loginController } = require('./controller/auth/login.controller');
const { defaultController } = require('./controller/default.controller');

app.use('/auth', loginController);
app.use(defaultController);

module.exports = { app };
