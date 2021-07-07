
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./db.config.js');

class Connection{
    static _client = undefined;
    static _db = undefined;

    static async connect(){
        MongoClient.connect(dbConfig.uri, dbConfig.options)
        .then( client =>{
            _client = client;
            _db = client.db(dbConfig.dbName);
        })
        .catch( err =>{
            console.log(err);
        })
    }
}

module.exports = { Connection }
