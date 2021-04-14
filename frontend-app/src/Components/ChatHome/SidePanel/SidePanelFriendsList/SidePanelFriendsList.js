
import './SidePanelFriendsList.css';

import { useState, useEffect } from 'react';

export default function SidePanelFriendsList(){
    // the real Friends List will be available via props/redux store

    const [friendsList, setFriendsList] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);

    function updateFriendsCountByOne(){
        setFriendsCount(friendsCount+1);
    }

    useEffect(()=>{
        let tempFriendsList = [];
        for (let i = 1; i <= friendsCount; i++){
            tempFriendsList.push("Friend" + i.toString());
        }
        setFriendsList(tempFriendsList);
    }, [friendsCount]);

    return(
        <div className="chat-friends-list-box">
        <button onClick={updateFriendsCountByOne}>Add One More Friend (BETA)</button><br/>
        <span>Total Friends : {friendsCount}</span>
        {friendsList.map((friend) => 
            <div key={friend} className="chat-friends-list-item">
                {friend}
            </div>
        )}
        </div>
    );
}
