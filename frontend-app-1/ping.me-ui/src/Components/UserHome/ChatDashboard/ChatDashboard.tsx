import React from 'react';
import './ChatDashboard.css';

import { TabPaneType } from 'UI/Pagination';

import {ImUser, ImUsers} from 'react-icons/im';

import { TabPane } from 'UI/Pagination';
import Carousel from 'UI/DisplayData/Carousel/Carousel';

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
                <div style={{ width: '50vw'}}>
                <Carousel 
                    elementsInView={3}
                    carouselElements={[
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(150, 90, 90, 1)'}}></div>),
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(150, 200, 90, 0.5)'}}></div>),
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(150, 90, 90, 0.9)'}}></div>),
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(150, 90, 230, 1)'}}></div>),
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(150, 80, 100, 0.6)'}}></div>),
                        (<div style={{width: '250px', height: '190px', backgroundColor: 'rgba(50, 190, 90, 0.4)'}}></div>),
                    ]}
                ></Carousel>
                </div>
                
            </div>
        </div>
    );
}

export default ChatDashboard;
