
import './ChatArea.css';

import ChatInputArea from './ChatInputArea/ChatInputArea';
import ChatListArea from './ChatListArea/ChatListArea';
import ChatUserInfoArea from './ChatUserInfoArea/ChatUserInfoArea';

export default function ChatArea(){
    return(
        <div className="chat-area-container">
            <div className="text-area-item user-info-area">
                <ChatUserInfoArea></ChatUserInfoArea>
            </div>
            <div className="text-area-item text-messages-area">
                <ChatListArea></ChatListArea>
            </div>
            <div className="text-area-item input-area">
                <ChatInputArea></ChatInputArea>
            </div>
        </div>
    );
}