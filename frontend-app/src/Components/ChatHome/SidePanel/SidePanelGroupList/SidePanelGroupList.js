
import { useState, useEffect } from 'react';

import './SidePanelGroupList.css';

export default function SidePanelGroupList(props){
    // the real Groups List would be available via the props/redux store

    // dummy groups listing
    let groupsList = [];
    let groupCount = 25;

    for(let i=1; i<=groupCount; i++){
        groupsList.push("Group " + i.toString());
    }

    return(
        <div className="chat-group-list-box">
        {groupsList.map((groupName) => 
            <div className="chat-group-list-item">
                { groupName }
            </div>
        )}
        </div>
    )
}
