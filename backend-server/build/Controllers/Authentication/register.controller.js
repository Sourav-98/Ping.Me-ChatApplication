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

const registerController = (0, express_1.Router)();

const registerService = __importStar(require("../../Services/Authentication/register.service"));

const ControllerUtility = __importStar(require("../../Utilities/Controllers/Authentication/authController.utility"));

const ResponseEnums_1 = require("../../Utilities/Enums/ResponseEnums");

let asyncDelay = async time => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};

registerController.get('/register', async (req, res) => {
  let responseData = await registerService.defaultRegisterService();
  await asyncDelay(2000);
  res.send(responseData);
});
registerController.post('/register', async (req, res) => {
  let userData = req.body; // check if valid data parameters was passed to the /register POST request

  let paramsList = ['firstName', 'lastName', 'emailId', 'password'];

  if (!ControllerUtility.isRequestParamsValid(userData, paramsList)) {
    res.status(400).send(JSON.stringify(ResponseEnums_1.ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS));
    return;
  }

  try {
    let registerServiceResult = await registerService.newUserRegistration(userData);
    await asyncDelay(1650);

    switch (registerServiceResult) {
      case -1:
        res.send(JSON.stringify(ResponseEnums_1.ResponseEnums.REGISTER_FAIL_EMAIL_ID_TAKEN));
        break;

      case 0:
        res.send(JSON.stringify(ResponseEnums_1.ResponseEnums.REGISTER_FAIL_INVALID_EMAIL_ID));
        break;

      case 1:
        res.send(JSON.stringify(ResponseEnums_1.ResponseEnums.REGISETER_SUCCESS));
        break;

      default:
        res.send(JSON.stringify({
          'blank': 'blank'
        }));
    }
  } catch (err) {
    res.status(500).send(JSON.stringify(Object.assign(Object.assign({}, ResponseEnums_1.ResponseEnums.REGISTER_FAIL_OTHER), {
      'err': err
    })));
  }
});
exports.default = registerController;