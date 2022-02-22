"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const express_1 = require("express");

const defaultController = (0, express_1.Router)();
defaultController.get('/', async (req, res) => {
  let defaultData = {
    message: "Default Route"
  };
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(defaultData);
});
defaultController.get('**', async (req, res) => {
  res.status(404).send('Page Not Found');
});
exports.default = defaultController;