"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const express_1 = require("express");

const accountRecoveryController = (0, express_1.Router)();
accountRecoveryController.get('/account-recovery', async (req, res) => {});
accountRecoveryController.post('/account-recovery', async (req, res) => {});
exports.default = accountRecoveryController;