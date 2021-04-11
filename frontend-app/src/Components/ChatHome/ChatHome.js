
import './ChatHome.css';

import ChatArea from './ChatArea/ChatArea';
import SidePanel from './SidePanel/SidePanel';

export default function ChatHome(){
    return(
        <div className="chat-container">
            <div className="chat-side-panel">
                <SidePanel></SidePanel>
            </div>
            <div className="chat-messages-area">
                <ChatArea></ChatArea>
            </div>
        </div>
    );
}
