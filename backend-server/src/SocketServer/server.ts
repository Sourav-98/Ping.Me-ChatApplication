import { Server as SocketioServer } from 'socket.io';
import { socketConfig } from './socket.config';

import { Server } from 'http';

import SocketService from './socket.service';

export default class SocketServer{
    private static _io : SocketioServer;

    static init(httpServer : Server){
        if(!this._io){
            try{
                this._io = new SocketioServer(httpServer, socketConfig);
                // console.log(this._io);
                console.log('Created a socket server');
                SocketService(this._io);
            }
            catch(err){
                console.log('Error creating a socket server -> ' + err);
            }
        }
    }

    static getSocketConnection() : SocketioServer {
        return this._io;
    }
}
