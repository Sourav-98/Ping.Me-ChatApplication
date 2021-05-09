
import { useState, useEffect } from 'react';

import './ChatHome.css';

import SideMenuPanel from './SideMenuPanel/SideMenuPanel';

import ChatDisplay from './ChatDisplay/ChatDisplay';

// import SideDisplayPanel from '';
// import TextAreaPanel from '';

export default function ChatHome(){

    const [selectedOption, setSelectedOption] = useState('chatOption');     // chatOption, notifOption, settingsOption

    const [notifCountList, setNotifCountList] = useState({
        'unreadChatCount' : 5,
        'notifCount': 11
    });

    const defaultOption = 'chatOption';
    
    function optionSelect(option){
        setSelectedOption(option);
    }

    function getSelectedOption(){
        return selectedOption;
    }

    useEffect(()=>{
        setSelectedOption(defaultOption);
    }, []);
    
    return (
        <div className="chat-home-container">
            <div className="side-menu-panel">
                <SideMenuPanel optionSelector={optionSelect} selectedOption={getSelectedOption} notifCountList={notifCountList}></SideMenuPanel>
            </div>
            <div className="display-panel">
                {
                    {
                        'chatOption' : <ChatDisplay></ChatDisplay>,
                        'notifOption' : <p>Notification Option</p>,
                        'settingOption' : <p>Setting Option</p>
                    }[selectedOption]
                }
            </div>
        </div>
    );
}