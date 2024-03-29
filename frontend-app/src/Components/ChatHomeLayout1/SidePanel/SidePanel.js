
import './SidePanel.css';

import SidePanelBranding from './SidePanelBranding/SidePanelBranding';
import SidePanelChatOptions from './SidePanelChatOptions/SidePanelChatOptions';
import SidePanelGroupList from './SidePanelGroupList/SidePanelGroupList';
import SidePanelFriendsList from './SidePanelFriendsList/SidePanelFriendsList';

export default function SidePanel(){
    return(
        <div className="chat-side-panel">
            <SidePanelBranding></SidePanelBranding>
            <div className="chat-side-panel-items-list">
                <SidePanelChatOptions></SidePanelChatOptions>
                <div>
                    My Groups <i className="fas fa-caret-down"></i>
                </div>
                <SidePanelGroupList></SidePanelGroupList>
                <div>
                    My Friends <i className="fas fa-caret-down"></i>
                </div>
                <SidePanelFriendsList></SidePanelFriendsList>
            </div>
        </div>
    );
}
