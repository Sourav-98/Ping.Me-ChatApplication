
import { useState } from 'react';

import { MdChat } from 'react-icons/md';
import { IoIosChatboxes, IoIosContact } from 'react-icons/io';

import UserAvatarStatusElement from './../UtilComponents/UserAvatarStatusElement/UserAvatarStatusElement';      // Ensure that this element is inside a square element

import './SideMenuPanel.css';
import logo from './../../../assets/ping.Me Logo NEW 3.png';
import avatar from './../../../assets/avatar.png';

export default function SideMenuPanel(){
    const [selectedOption, setSelectedOption] = useState("chats");   // chats, friends and groups

    function onOptionSelect(option){
        setSelectedOption(option);
    }

    // useEffect(()=>{

    // }, [selectedOption]);

    return (
        <div className="side-menu-panel-container">
            <div className="logo-branding">
                <img src={logo}></img>
            </div>

            <div className={`menu-option ${selectedOption === 'chats' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('chats')}}>
                <IoIosChatboxes></IoIosChatboxes>
            </div>
            <div className={`menu-option ${selectedOption === 'friends' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('friends')}}>
                
            </div>
            <div className={`menu-option ${selectedOption === 'groups' ? 'selected' : ''}`} onClick={()=>{onOptionSelect('groups')}}>
                <MdChat></MdChat>
            </div>
            <div className="user-options">
                <UserAvatarStatusElement userStatus="online" userImage={avatar}></UserAvatarStatusElement>
            </div>
        </div>
    )
}