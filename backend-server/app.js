const http = require('http')
const { app } = require('./server');
const { Connection } = require('./util/db/dbConn.util');

// const dotenv = require('dotenv');
const path = require('path');

// dotenv.config({path: path.join(__dirname, '.env')});
Connection.connect();

const host = 'localhost';
const port = 8080;

const httpServer = http.createServer(app);

httpServer.listen(port, host, ()=>{
    console.log("PingMe backend running on http://"+host+":"+port+"\n");
});
