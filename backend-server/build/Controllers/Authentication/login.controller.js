"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(a,b,c,d){d===void 0&&(d=c),Object.defineProperty(a,d,{enumerable:!0,get:function(){return b[c]}})}:function(a,b,c,d){d===void 0&&(d=c),a[d]=b[c]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(a,b){Object.defineProperty(a,"default",{enumerable:!0,value:b})}:function(a,b){a["default"]=b}),__importStar=this&&this.__importStar||function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)"default"!=c&&Object.prototype.hasOwnProperty.call(a,c)&&__createBinding(b,a,c);return __setModuleDefault(b,a),b};Object.defineProperty(exports,"__esModule",{value:!0});const express_1=require("express"),loginController=(0,express_1.Router)(),loginService=__importStar(require("../../Services/Authentication/login.service")),ControllerUtility=__importStar(require("../../Utilities/Controllers/Authentication/authController.utility")),ResponseEnums_1=require("../../Utilities/Enums/ResponseEnums");let asyncDelay=async a=>new Promise(b=>{setTimeout(()=>b(),a)});// interface e.Request<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = QueryString.ParsedQs, Locals extends Record<string, any> = Record<string, any>>
loginController.get("/login",async(a,b)=>{b.send(loginService.defaultLoginMessage())}),loginController.post("/login",async(a,b)=>{let c=a.body;// check if valid data parameters was passed to the /login POST request
if(!ControllerUtility.isRequestParamsValid(c,["emailId","password"]))return void b.status(400).send(JSON.stringify(ResponseEnums_1.ResponseEnums.REQUEST_FAIL_INVALID_PARAMETERS));try{let a=await loginService.defaultUserLogin(c);switch(await asyncDelay(2e3),a){case-1:b.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_FAIL_INVALID_PASSWORD));break;case 0:b.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_FAIL_INVALID_EMAIL_ID));break;case 1:b.status(200).send(JSON.stringify(ResponseEnums_1.ResponseEnums.LOGIN_SUCCESS));break;default:b.status(400).send(JSON.stringify({blank:"blank"}));}}catch(a){await asyncDelay(1e3),b.status(500).send(JSON.stringify(Object.assign(Object.assign({},ResponseEnums_1.ResponseEnums.LOGIN_FAIL_OTHER),{err:a})))}}),exports.default=loginController;