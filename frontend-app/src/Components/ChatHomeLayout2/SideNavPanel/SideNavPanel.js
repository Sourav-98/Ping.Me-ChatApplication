

import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { IoIosChatboxes } from 'react-icons/io';
import { IoNotificationsSharp, IoCogSharp } from 'react-icons/io5'

import UserAvatarStatusElement2 from '../UtilComponents/UserAvatarStatusElement2/UserAvatarStatusElement2';      // Ensure that this element is inside a square element

import './SideNavPanel.css';
import logo from './../../../assets/ping.Me Logo NEW 3.png';
import avatar from './../../../assets/avatar.png';

export default function SideNavPanel(props){
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
            return null ;
        }
    }

    return (
        <div className="side-nav-panel-container">
            <div className="side-nav-branding">
                <img src={logo} alt="Ping.Me Logo"></img>
            </div>
            <nav className="side-nav-link-container">
                <NavLink className="side-nav-link-item" activeClassName="selected" exact to={`${props.path}`}>
                    <IoIosChatboxes></IoIosChatboxes>
                    <NotifCountItem count={unreadChatCount} currentOption={selectedOption} actualOption={'chatOption'}></NotifCountItem>
                </NavLink>
                <NavLink className="side-nav-link-item" activeClassName="selected" to={`${props.path}/notifs`}>
                    <IoNotificationsSharp></IoNotificationsSharp>
                    <NotifCountItem count={notifCount} currentOption={selectedOption} actualOption={'notifOption'}></NotifCountItem>
                </NavLink>
                <NavLink className="side-nav-link-item pan-bottom" activeClassName="selected" to={`${props.path}/settings`}>
                    <IoCogSharp></IoCogSharp>
                </NavLink>
            </nav>
            <div className="side-nav-user-profile">
                <UserAvatarStatusElement2 userStatus="online" userImage={avatar}></UserAvatarStatusElement2>
            </div>
        </div>
    )
}