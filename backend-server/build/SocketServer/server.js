"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const socket_io_1 = require("socket.io");

const socket_config_1 = require("./socket.config");

const socket_service_1 = __importDefault(require("./socket.service"));

class SocketServer {
  static init(httpServer) {
    if (!this._io) {
      try {
        this._io = new socket_io_1.Server(httpServer, socket_config_1.socketConfig); // console.log(this._io);

        console.log('Created a socket server');
        (0, socket_service_1.default)(this._io);
      } catch (err) {
        console.log('Error creating a socket server -> ' + err);
      }
    }
  }

  static getSocketConnection() {
    return this._io;
  }

}

exports.default = SocketServer;