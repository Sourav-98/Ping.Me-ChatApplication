
import http from 'http';
import server from './server';
import DBConnection from './Utilities/DB/dbConn.utility';
import SMTP from './Utilities/SMTP/SMTP.utility';
import path from 'path';
import SocketServer from './SocketServer/server';
import dotenv from 'dotenv';

console.log(path.join(__dirname, '.env'));

dotenv.config({path: path.join(__dirname, '.env')});

const host : string = process.env.SERVER_HOST || 'localhost';
const port : number = parseInt(process.env.SERVER_PORT || '8080');

console.log(host, port);

const httpServer = http.createServer(server);


/** Initialise the app services like Database, Socket and SMTP */
//initialize DB connection
DBConnection.init();

//initialize SMTP service
SMTP.init();

//initialize socket server
SocketServer.init(httpServer);
// SocketService(SocketServer.getSocketConnection());

httpServer.listen(8080, host, ()=>{
    console.log("PingMe backend running on ", host, ":", port, "\n");
});
