
import './BubbleZoomLoader.css';

export default function BouncingLoader(){
    return(
        <div className="bubble-zoom-loader-row">
            <div className="bubble-zoom-loader-container">
                <div className="zoom-bubble"></div>
                <div className="zoom-bubble"></div>
                <div className="zoom-bubble"></div>
                <div className="zoom-bubble"></div>
            </div>
        </div>
    )
}
