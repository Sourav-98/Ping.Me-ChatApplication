
import { useState, useEffect } from 'react';

import './ChatDisplay.css';

export default function ChatDisplay(){

    const [unreadChatCount, setUnreadChatCount] = useState(8);

    useEffect(() => {
        
    }, [])

    return(
        <div className="chat-interface-container">
            <div className="chat-history-panel">

            </div>
            <div className="chat-text-area">

            </div>
        </div>
    )
}