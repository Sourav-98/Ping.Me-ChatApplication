
import http from 'http';
import server from './server';
import DBConnection from 'Utilities/DB/dbConn.utility';
import SMTP from 'Utilities/SMTP/SMTP.utility';

import SocketServer from 'SocketServer/server';

// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config({path: path.join(__dirname, '.env')});

const host : string = 'localhost';
const port : number = 8080;

const httpServer = http.createServer(server);


/** Initialise the app services like Database, Socket and SMTP */
//initialize DB connection
DBConnection.init();

//initialize SMTP service
SMTP.init();

//initialize socket server
SocketServer.init(httpServer);
// SocketService(SocketServer.getSocketConnection());

httpServer.listen(port, host, ()=>{
    console.log("PingMe backend running on http://"+host+":"+port+"\n");
});
