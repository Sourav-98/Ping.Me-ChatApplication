
import './BubbleBounceLoader.css';

const BubbleBounceLoader : React.FC = () => {
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

export default BubbleBounceLoader;
