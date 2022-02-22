
import { MongoClient, Db } from 'mongodb';
import dbConfig from './dbConn.config';

export default class DBConnection{
    private static _client : MongoClient;
    private static _db : Db;
    private static _dbConfig = dbConfig;

    static async connect() : Promise<void>{
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

    static getDb() : Db{
        if(!this._client){
            this.connect();
        }
        return this._db;
    }
}
