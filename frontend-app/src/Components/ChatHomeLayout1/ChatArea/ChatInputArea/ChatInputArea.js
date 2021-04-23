
import './ChatInputArea.css';

export default function ChatInputArea(){
    return (
        <div className="chat-input-area-box">
            <div className="chat-input-textarea">
                <textarea placeholder="Enter Message..."></textarea>
            </div>
            <div className="chat-input-button">
                <button><i className="fas fa-paper-plane"></i></button>
            </div>
        </div>
    )
}
