
import { useState, useEffect } from 'react';

import { IoIosChatboxes } from 'react-icons/io';
import { IoNotificationsSharp, IoCogSharp } from 'react-icons/io5'

import UserAvatarStatusElement from './../UtilComponents/UserAvatarStatusElement/UserAvatarStatusElement';      // Ensure that this element is inside a square element

import './SideMenuPanel.css';
import logo from './../../../assets/ping.Me Logo NEW 3.png';
import avatar from './../../../assets/avatar.png';

export default function SideMenuPanel(props){
    const [selectedOption, setSelectedOption] = useState('');   // chatOption, notifOption, settingOption
    const [unreadChatCount, setUnreadChatCount] = useState(props.notifCountList.unreadChatCount);
    const [notifCount, setNotifCount] = useState(props.notifCountList.notifCount);

    useEffect(()=>{
        setSelectedOption(props.selectedOption);
        console.log('Option set!');
    }, [props.selectedOption]);

    function onOptionSelect(option){
        setSelectedOption(option);
        // setNotifCount(0);
        props.optionSelector(option);   // set the side display according to the option selected
    }

    function NotifCountItem(props){
        if (props.count > 9) {
            return <div className={`notif-count ${props.currentOption === props.actualOption ? 'hidden-notif' : ''}`}>9+</div> ;
        }
        else if (props.count > 0){
            return <div className={`notif-count ${props.currentOption === props.actualOption ? 'hidden-notif' : ''}`}>{props.count}</div> ;
        }
        else{
            return <></> ;
        }
    }

    return (
        <div className="side-menu-panel-container">
            <div className="logo-branding">
                <img src={logo} alt="Ping.Me Logo"></img>
            </div>
            <div className={`menu-option ${selectedOption === 'chatOption' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('chatOption')}}>
                <IoIosChatboxes></IoIosChatboxes>
                <NotifCountItem count={unreadChatCount} currentOption={selectedOption} actualOption={'chatOption'}></NotifCountItem>
            </div>
            <div className={`menu-option ${selectedOption === 'notifOption' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('notifOption')}}>
                <IoNotificationsSharp></IoNotificationsSharp>
                <NotifCountItem count={notifCount} currentOption={selectedOption} actualOption={'notifOption'}></NotifCountItem>
            </div>
            <div className={`menu-option settings ${selectedOption === 'settingOption' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('settingOption')}}>
                <IoCogSharp></IoCogSharp>
            </div>
            <div className="user-options">
                <UserAvatarStatusElement userStatus="online" userImage={avatar}></UserAvatarStatusElement>
            </div>
        </div>
    )
}