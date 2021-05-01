
import './UserAvatarStatusElement.css';

import { IoIosContact } from 'react-icons/io';

export default function UserAvatarStatusElement(props){
    return(
        <div className="user-avatar-box">
            <div className={`outer-status-box ${props.userStatus === 'online' ? 'online' : 'offline'}`}>
                <div className="inner-avatar-box">
                    <img src={props.userImage}></img>
                </div>
            </div>
        </div>
    )
}