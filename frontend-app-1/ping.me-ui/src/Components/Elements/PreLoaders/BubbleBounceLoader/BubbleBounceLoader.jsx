
import './BubbleBounceLoader.css';

export default function BubbleBounceLoader(){
    return(
        <div className="bubble-bounce-loader-row">
            <div className="bubble-bounce-loader-container">
                <div className="bounce-bubble"></div>
                <div className="bounce-bubble"></div>
                <div className="bounce-bubble"></div>
                <div className="bounce-bubble"></div>
            </div>
        </div>
    )
}
