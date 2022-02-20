import {Server as SocketioServer} from 'socket.io';
import { socketConfig } from './socket.config';

import SocketService from './socket.service';

export default class SocketServer{
    static _io = undefined;

    static init(httpServer){
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

    static getSocketConnection(){
        return this._io;
    }
}
