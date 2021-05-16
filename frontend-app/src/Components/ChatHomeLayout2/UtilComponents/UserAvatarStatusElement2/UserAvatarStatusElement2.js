
import './UserAvatarStatusElement2.css';

export default function UserAvatarStatusElement2(props){
    return(
        <div className="user-avatar-box">
            <div className="inner-avatar-box">
                <img src={props.userImage} alt="Profile Image"></img>
                <div className="user-status-marker-container">
                    <div className={`user-status-marker ${props.userStatus === 'online' ? 'online' : 'offline'}`}></div>
                </div>
            </div>
        </div>
    )
}