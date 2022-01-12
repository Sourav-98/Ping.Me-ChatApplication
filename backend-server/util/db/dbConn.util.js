
const MongoClient = require('mongodb').MongoClient;
const { dbConfig } = require('./db.config.js');

class Connection{
    static _client = undefined;
    static _db = undefined;
    static _dbConfig = dbConfig;

    static async connect(){
        MongoClient.connect(this._dbConfig.uri, this._dbConfig.options)
        .then( client =>{
            console.log("--------Connected to MongoDB database--------");
            this._client = client;
            this._db = client.db(dbConfig.dbName);
        })
        .catch( err =>{
            console.log(err);
        })
    }

    static getDb(){
        return this._db;
    }
}

module.exports = { Connection }