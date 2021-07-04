

import './ChatTextElement.css';

export default function ChatTextElement(props){
    // if the sender of the chat text is "self", then right align the chat text element. Else, it will be left aligned
    // props.isLeft

    return(
        <div className={`chat-text-element-container ${props.isLeft ? 'left' : 'right'}`}>
            <div className="chat-text-box">
                {props.text}
            </div>
        </div>
    )
}
