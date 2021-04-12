
import './ChatArea.css';

import ChatInputArea from './ChatInputArea/ChatInputArea';
import ChatMessagesArea from './ChatMessagesArea/ChatMessagesArea';
import ChatUserInfoArea from './ChatUserInfoArea/ChatUserInfoArea';

export default function ChatArea(){
    return(
        <div className="chat-area-container">
            <div className="user-info-area">
                <ChatUserInfoArea></ChatUserInfoArea>
            </div>
            <div className="text-messages-area">
                <ChatMessagesArea></ChatMessagesArea>
            </div>
            <div className="input-area">
                <ChatInputArea></ChatInputArea>
            </div>
        </div>
    );
}