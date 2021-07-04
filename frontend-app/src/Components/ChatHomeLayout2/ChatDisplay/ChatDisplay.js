
import { useState, useEffect } from 'react';

import { IoPersonSharp, IoPeopleSharp } from 'react-icons/io5';

import './ChatDisplay.css';

import ChatHistoryElement from './ChatDisplayElements/ChatHistoryElement/ChatHistoryElement';

import ChatTextElement from './ChatDisplayElements/ChatTextElement/ChatTextElement';


import userAvatarM from './../../../assets/avatar.png';
import userAvatarF from './../../../assets/img_avatar2.png';

export default function ChatDisplay(){

    const [unreadChatCount, setUnreadChatCount] = useState(8);

    const [chatTypeSelector, setChatTypeSelector] = useState('friends'); // chat types -> friends, groups

    const [chatHistoryList, setChatHistoryList] = useState([]);


    async function loadChatHistoryInitial(){
        // A function that performs the initial API call to get the list of recent chats.

        // Performing a fake setup of the list
        setChatHistoryList(
            [
                {
                    userName: "John Doe",
                    userImage: userAvatarM,
                    userStatus: 'online',
                    recentMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    readReceipt: true
                },
                {
                    userName: "Jane Roe",
                    userImage: userAvatarF,
                    userStatus: 'offline',
                    recentMessage: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    readReceipt: true
                },
                {
                    userName: "Priscilla Snyder",
                    userImage: userAvatarF,
                    userStatus: 'offline',
                    recentMessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    readReceipt: false
                },
                {
                    userName: "Clifford Bourn",
                    userImage: userAvatarM,
                    userStatus: 'online',
                    recentMessage: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    readReceipt: true
                },
                {
                    userName: "Willow Wells",
                    userImage: userAvatarM,
                    userStatus: 'offline',
                    recentMessage: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                    readReceipt: false
                },
            ]
        )
    }

    async function newChatThread(){
        let tempChatHistory = [...chatHistoryList];
        tempChatHistory.push(
            {
                userName: "Willow Wells",
                userImage: userAvatarM,
                userStatus: 'offline',
                recentMessage: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                readReceipt: false
            }
        );
        setChatHistoryList(tempChatHistory);
    }


    useEffect(() => {
        loadChatHistoryInitial();
    }, []);

    return(
        <div className="chat-interface-container">
            <div className="chat-history-panel">
                <div className="chat-history-panel-label">
                    Recent Chats
                </div>
                <div className="chat-type-selector-tab">
                    <div className={`chat-type-selector-tab-item ${chatTypeSelector === 'friends' ? 'active' : ''}`} onClick={()=>{setChatTypeSelector('friends'); newChatThread();}}>
                        <IoPersonSharp></IoPersonSharp>
                    </div>
                    <div className={`chat-type-selector-tab-item ${chatTypeSelector === 'groups' ? 'active' : ''}`} onClick={()=>{setChatTypeSelector('groups')}}>
                        <IoPeopleSharp></IoPeopleSharp>
                    </div>
                </div>
                <div className="chat-history-list">
                {
                    chatHistoryList.map((user) => 
                        <ChatHistoryElement key={user.userName} userName= {user.userName} userImage={user.userImage} userStatus={user.userStatus} recentMessage={user.recentMessage} readReceipt={user.readReceipt} ></ChatHistoryElement>
                    )
                }
                </div>
            </div>
            <div className="chat-text-area">
                <ChatTextElement isLeft={true} text={"Hello world"}></ChatTextElement>
                <ChatTextElement isLeft={false} text={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}></ChatTextElement>
            </div>
        </div>
    )
}