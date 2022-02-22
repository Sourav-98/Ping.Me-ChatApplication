"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const express_1 = require("express");

const loginController = (0, express_1.Router)();

const loginService = __importStar(require("../../Services/Authentication/login.service"));

const ControllerUtility = __importStar(require("../../Utilities/Controllers/Authentication/authController.utility"));

const ResponseEnums_1 = require("../../Utilities/Enums/ResponseEnums");

let asyncDelay = async time => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};

loginController.get('/login', async (req, res) => {
  res.send(loginService.defaultLoginMessage());
});
loginController.post('/login', async (req, res) => {
  let userData = req.body; // check if valid data parameters was passed to the /login POST request

  let paramsList = ['emailId', 'password'];

  if (!ControllerUtility.isRequestParamsValid(userData, paramsList)) {
    res.status(400).send(JSON.stringify(ResponseEnums_1.ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS));
    return;
  }

  try {
    let loginServiceResult = await loginService.defaultUserLogin(userData);
    await asyncDelay(2000);

    switch (loginServiceResult) {
      case -1:
        res.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD));
        break;

      case 0:
        res.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID));
        break;

      case 1:
        res.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_SUCCESS));
        break;

      default:
        res.status(400).send(JSON.stringify({
          'blank': 'blank'
        }));
        break;
    }
  } catch (err) {
    await asyncDelay(1000);
    res.status(500).send(JSON.stringify(Object.assign(Object.assign({}, ResponseEnums_1.ResponseEnums.LOGIN_FAIL_OTHER), {
      'err': err
    })));
  }
});
exports.default = loginController;