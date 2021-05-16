
import UserAvatarStatusElement2 from './../../UtilComponents/UserAvatarStatusElement2/UserAvatarStatusElement2';

import './ChatHistoryElement.css';

export default function ChatHistoryElement(props){
    return(
        <div className="chat-history-element-container">
            <div className="chat-user-avatar-box">
                <UserAvatarStatusElement2 userStatus={props.userStatus} userImage={props.userImage}></UserAvatarStatusElement2>
            </div>
            <div className="chat-history-disc-box">

            </div>
        </div>
    )
}
