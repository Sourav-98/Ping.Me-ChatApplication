
import { MongoClient } from 'mongodb';
import dbConfig from './dbConn.config';

export default class DBConnection{
    static _client = undefined;
    static _db = undefined;
    static _dbConfig = dbConfig;

    static async connect(){
        MongoClient.connect(this._dbConfig.uri, this._dbConfig.options)
        .then( client => {
            console.log("--------Connected to MongoDB database--------");
            this._client = client;
            this._db = client.db(dbConfig.db);
        })
        .catch( err => {
            console.log("-------------MongoDB Connection ERROR--------------");
            console.log(err);
        })
    }

    static getDb(){
        if(!this._client){
            this.connect();
        }
        return this._db;
    }
}
