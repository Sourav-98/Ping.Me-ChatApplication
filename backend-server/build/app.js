"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const http_1 = __importDefault(require("http"));

const server_1 = __importDefault(require("./server"));

const dbConn_utility_1 = __importDefault(require("./Utilities/DB/dbConn.utility"));

const server_2 = __importDefault(require("./SocketServer/server")); // const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({path: path.join(__dirname, '.env')});


const host = 'localhost';
const port = 8080;
const httpServer = http_1.default.createServer(server_1.default); //initialize DB connection

dbConn_utility_1.default.connect(); //initialize socket server

server_2.default.init(httpServer); // SocketService(SocketServer.getSocketConnection());

httpServer.listen(port, host, () => {
  console.log("PingMe backend running on http://" + host + ":" + port + "\n");
});