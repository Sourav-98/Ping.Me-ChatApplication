const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const appLogger = require('./logger/logger');

const appRoutes = require('./routes/defaultRoutes');

app.use(appRoutes);

module.exports = app;
