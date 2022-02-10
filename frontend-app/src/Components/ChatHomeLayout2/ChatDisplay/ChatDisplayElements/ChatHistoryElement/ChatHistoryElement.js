
import UserAvatarStatusElement2 from '../../../UtilComponents/UserAvatarStatusElement2/UserAvatarStatusElement2';

import { CSSTransition } from 'react-transition-group';

import './ChatHistoryElement.css';
import React, { useState, useEffect } from 'react';

export const ChatHistoryElement = React.memo(function ChatHistoryElement({userUniqueId, userStatus, userImage, removeElement, ...props}){
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setIsShown(true);
    }, []);

    return(
        <CSSTransition
            classNames="chat-history-element"
            in={isShown}
            timeout={{
                enter: 1000,
                exit: 700
            }}
            unmountOnExit
            onExited={()=>{removeElement(userUniqueId)}}
        >
            <div id={userUniqueId} className='chat-history-element-container-wrapper'>
                <div className="chat-history-element-container">
                    <div className="chat-user-avatar-box">
                        <UserAvatarStatusElement2 userStatus={userStatus} userImage={userImage}></UserAvatarStatusElement2>
                    </div>
                    <div className="chat-history-disc-box">
                        <button onClick={()=>{setIsShown(false)}}>X</button>
                    </div>
                </div>
            </div>
            
        </CSSTransition>
        
    )
})

// export default function ChatHistoryElement({userUniqueId, userStatus, userImage, removeElement}){
//     const [isShown, setIsShown] = useState(false);

//     useEffect(() => {
//         setIsShown(true);
//     }, []);

//     return(
//         <CSSTransition
//             classNames="chat-history-element"
//             in={isShown}
//             timeout={{
//                 enter: 100,
//                 exit: 200
//             }}
//             unmountOnExit={true}
//             onExited={()=>{removeElement(userUniqueId)}}
//         >     
//             <div id={userUniqueId} className="chat-history-element-container">
//                 <div className="chat-user-avatar-box">
//                     <UserAvatarStatusElement2 userStatus={userStatus} userImage={userImage}></UserAvatarStatusElement2>
//                 </div>
//                 <div className="chat-history-disc-box">
//                     <button onClick={()=>{setIsShown(false)}}>X</button>
//                 </div>
//             </div>
//         </CSSTransition>
        
//     )
// }
