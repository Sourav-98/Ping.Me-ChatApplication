
import './ChatHome.css';

import SideMenuPanel from './SideMenuPanel/SideMenuPanel';
// import SideDisplayPanel from '';
// import TextAreaPanel from '';

export default function ChatHome(){
    return (
        <div className="chat-home-container">
            <div className="side-menu-panel">
                <SideMenuPanel></SideMenuPanel>
            </div>
            <div className="display-panel">
                B
            </div>
        </div>
    );
}