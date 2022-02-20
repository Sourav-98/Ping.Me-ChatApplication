
import { io } from 'socket.io-client';

export const chatUserSocketInit = () => {
    const namespace = "/chat-api";
    
    const socket = io(namespace);
}
