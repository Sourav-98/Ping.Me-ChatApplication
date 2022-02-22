import { Server as SocketioServer, Socket } from 'socket.io';

export default function SocketService(socketioServer : SocketioServer){
    socketioServer.on('connection', (socket : Socket)=>{
        console.log("New Socket Connection - Socket ID: " + socket.id + "\n");
        // emit the new socket id
        socket.emit('new-socket-id', socket.id);

        // make a new user join the room DEFAULT_ROOM_1 on a new connection
        socket.join("DEFAULT_ROOM_1");
        console.log("Active Rooms: " + socket.rooms);
        
        // broadcast new user joining to the default room
        socketioServer.to("DEFAULT_ROOM_1").emit("new-user-entry", {
            user_id: socket.id
        });

        socket.on("client-disconnect", ()=>{
            console.log("Disconnection Request from " + socket.id + " ----- ");
            socket.disconnect(true);
        });
    
        socket.on("disconnect", ()=>{
            socketioServer.to("DEFAULT_ROOM_1").emit("user-exit", {
                user_id: socket.id
            });
            console.log("DISCONNECTED: " + socket.id + "\n");
        });
    })
}
