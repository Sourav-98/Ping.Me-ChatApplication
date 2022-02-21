
import http from 'http';
import server from './server';
import DBConnection from 'Utilities/DB/dbConn.utility';

import SocketServer from 'SocketServer/server';

// const dotenv = require('dotenv');
const path = require('path');

// dotenv.config({path: path.join(__dirname, '.env')});

const host = 'localhost';
const port = 8080;

const httpServer = http.createServer(server);

//initialize DB connection
DBConnection.connect();

//initialize socket server
SocketServer.init(httpServer);
// SocketService(SocketServer.getSocketConnection());

httpServer.listen(port, host, ()=>{
    console.log("PingMe backend running on http://"+host+":"+port+"\n");
});
