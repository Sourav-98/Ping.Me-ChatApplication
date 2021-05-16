
import { useState, useEffect } from 'react';

import { IoPersonSharp, IoPeopleSharp } from 'react-icons/io5';

import './ChatDisplay.css';

import ChatHistoryElement from './ChatHistoryElement/ChatHistoryElement';


import userAvatar from './../../../assets/avatar.png';

export default function ChatDisplay(){

    const [unreadChatCount, setUnreadChatCount] = useState(8);

    const [chatTypeSelector, setChatTypeSelector] = useState('friends'); // chat types -> friends, groups

    const [chatHistoryList, setChatHistoryList] = useState({});

    useEffect(() => {
        
    }, [chatHistoryList])

    return(
        <div className="chat-interface-container">
            <div className="chat-history-panel">
                <div className="chat-history-panel-label">
                    Recent Chats
                </div>
                <div className="chat-type-selector-tab">
                    <div className={`chat-type-selector-tab-option ${chatTypeSelector === 'friends' ? 'active' : ''}`} onClick={()=>{setChatTypeSelector('friends')}}>
                        <IoPersonSharp></IoPersonSharp>
                    </div>
                    <div className={`chat-type-selector-tab-option ${chatTypeSelector === 'groups' ? 'active' : ''}`} onClick={()=>{setChatTypeSelector('groups')}}>
                        <IoPeopleSharp></IoPeopleSharp>
                    </div>
                </div>
                <div className="chat-history-list">
                    <ChatHistoryElement userImage={userAvatar} userStatus={'online'}></ChatHistoryElement>
                    <ChatHistoryElement userImage={userAvatar} userStatus={'offline'}></ChatHistoryElement>
                    <ChatHistoryElement userImage={userAvatar} userStatus={'online'}></ChatHistoryElement>
                </div>
            </div>
            <div className="chat-text-area">

            </div>
        </div>
    )
}