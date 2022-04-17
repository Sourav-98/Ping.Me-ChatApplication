import React from 'react';
import './ChatDashboard.css';

import { TabPaneType } from 'UI/Pagination';

import {ImUser, ImUsers} from 'react-icons/im';

import { TabPane } from 'UI/Pagination';

const ChatDashboard : React.FC = () => {

    const tabList : Array<TabPaneType> = [
        {
            tabHeaderLabel : <ImUser></ImUser>,
            tabContent : <div>Content 1</div>,
        },
        {
            tabHeaderLabel : <ImUsers></ImUsers>,
            tabContent : (<div>Content 2</div>),
        }
    ]

    return (
        <div className="chat-user-dashboard-container">
            <div className="chat-history-panel">
                <TabPane tabList={tabList}></TabPane>
            </div>
            <div className="chat-area-panel">
                B
            </div>
        </div>
    );
}

export default ChatDashboard;
