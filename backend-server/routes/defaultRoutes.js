const express = require('express');
const routes = express.Router();

const defaultController = require('./../controller/defaultController');
const loggerModule = require('../logger/logger');

routes.get('/', loggerModule.appLogger, defaultController.getHome);
routes.get('*', loggerModule.appLogger, (req, res, err)=>{
    // 404 output data
})

module.exports = routes;
