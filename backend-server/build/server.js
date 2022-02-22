"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const express_1 = __importDefault(require("express")); // const path = require('path');
// const bodyParser = require('body-parser');


const server = (0, express_1.default)(); // const appLogger = require('./logger/logger');

const login_controller_1 = __importDefault(require("./Controllers/Authentication/login.controller"));

const register_controller_1 = __importDefault(require("./Controllers/Authentication/register.controller"));

const default_controller_1 = __importDefault(require("./Controllers/default.controller"));

server.use(express_1.default.urlencoded({
  extended: false
}));
server.use(login_controller_1.default);
server.use(register_controller_1.default);
server.use(default_controller_1.default);
exports.default = server;