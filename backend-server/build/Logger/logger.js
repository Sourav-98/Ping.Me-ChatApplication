"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appLogger = void 0;

const appLogger = function (req, res, next) {
  let url = req.url;
  let ip = req.ip;
  let method = req.method;
  let dateTime = new Date();
  console.log("[" + dateTime.toISOString() + "] - " + ip + " made a " + method + " request on URL=" + url);
  next();
};

exports.appLogger = appLogger; // module.exports = appLogger;