
import { BrowserRouter as Router, Switch, Link, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { useState, useEffect } from 'react';

import './ChatHome.css';

import SideNavPanel from './SideNavPanel/SideNavPanel';

import ChatDisplay from './ChatDisplay/ChatDisplay';

// import SideDisplayPanel from '';
// import TextAreaPanel from '';

export default function ChatHome(){

    let { path, url } = useRouteMatch();

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
        console.log(path + "  " + url);
    }, []);

    function Dummy(){
        return(
            <div>
                <p>Notifications</p>
            </div>
        )
    }

    function Settings(){
        return(
            <div>
                <p>Settings</p>
            </div>
        )
    }
    
    return (
        <div className="chat-home-container">
            <div className="side-menu-panel">
                <SideNavPanel path={path} url={url} optionSelector={optionSelect} selectedOption={getSelectedOption} notifCountList={notifCountList}></SideNavPanel>
            </div>
            <div className="display-panel">
                <Switch>
                    <Route exact path={`${path}`}>
                        <ChatDisplay></ChatDisplay>
                    </Route>
                    <Route exact path={`${path}/notifs`}>
                        <Dummy></Dummy>
                    </Route>
                    <Route path={`${path}/settings`}>
                        <Settings></Settings>
                    </Route>
                    {/* <Route exact path={path}>
                        <Redirect to={`${path}/chat-landing`}></Redirect>
                    </Route> */}
                </Switch>
            </div>
        </div>
        
    );
}