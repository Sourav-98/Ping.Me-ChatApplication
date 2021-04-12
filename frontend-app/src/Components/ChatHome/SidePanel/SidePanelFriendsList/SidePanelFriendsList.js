
import './SidePanelFriendsList.css';

export default function SidePanelFriendsList(){
    // the real Friends List will be available via props/redux store

    // dummy friends listing
    let friendsList = [];
    let friendsCount = 93;

    for(let i=1; i<=friendsCount; i++){
        friendsList.push("Friend " + i.toString());
    }
    
    return(
        <div className="chat-friends-list-box">
        {friendsList.map((friend) => 
            <div className="chat-friends-list-item">
                {friend}
            </div>
        )}
        </div>
    );
}
