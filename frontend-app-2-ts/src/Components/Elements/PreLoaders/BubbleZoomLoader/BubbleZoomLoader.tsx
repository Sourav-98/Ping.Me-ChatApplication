
import './BubbleZoomLoader.css';

const BouncingLoader : React.FC = () => {
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

export default BouncingLoader;
