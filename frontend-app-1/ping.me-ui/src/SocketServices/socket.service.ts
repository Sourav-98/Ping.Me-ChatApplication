
import { io, Socket } from 'socket.io-client';

export const chatUserSocketInit = () => {
    const namespace = "/chat-api";
    
    const socket : Socket = io(namespace);
}
