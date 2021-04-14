
import { useState, useEffect } from 'react';

import './SidePanelGroupList.css';

export default function SidePanelGroupList(props){
    // the real Groups List would be available via the props/redux store

    const [groupList, setGroupList] = useState([]);
    const [groupCount, setGroupCount] = useState(0);

    function increaseGroupCountByOne(){
        setGroupCount(groupCount+1);
    }

    useEffect(()=>{
        let tempGroupList = [];
        for (let i = 1; i <= groupCount; i++){
            tempGroupList.push("Group " + i.toString());
        }
        setGroupList(tempGroupList);
    }, [groupCount]);

    return(
        <div className="chat-group-list-box">
            <button onClick={increaseGroupCountByOne}>Add new group (BETA)</button>
            <span>Total Groups : {groupCount}</span>
            {groupList.map((groupName) => 
                <div key={groupName} className="chat-group-list-item">
                    { groupName }
                </div>
            )}
        </div>
    )
}
