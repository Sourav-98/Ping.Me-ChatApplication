"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const mongodb_1 = require("mongodb");

const dbConn_config_1 = __importDefault(require("./dbConn.config"));

class DBConnection {
  static async connect() {
    mongodb_1.MongoClient.connect(this._dbConfig.uri, this._dbConfig.options).then(client => {
      console.log("--------Connected to MongoDB database--------");
      this._client = client;
      this._db = client.db(dbConn_config_1.default.db);
    }).catch(err => {
      console.log("-------------MongoDB Connection ERROR--------------");
      console.log(err);
    });
  }

  static getDb() {
    if (!this._client) {
      this.connect();
    }

    return this._db;
  }

}

exports.default = DBConnection;
DBConnection._dbConfig = dbConn_config_1.default;