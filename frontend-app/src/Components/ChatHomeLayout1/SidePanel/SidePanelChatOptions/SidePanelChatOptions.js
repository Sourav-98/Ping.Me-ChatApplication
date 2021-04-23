
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

import './SidePanelChatOptions.css';

export default function SidePanelChatOptions(){
    return(
        <div className="chat-options-box">
            <div className="chat-options-item">
                <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
            </div>
            <div className="chat-options-item">
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            </div>
        </div>
    )
}