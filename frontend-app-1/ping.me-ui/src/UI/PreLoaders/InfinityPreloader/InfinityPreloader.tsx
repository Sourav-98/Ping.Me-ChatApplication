import React from 'react';
import './InfinityPreloader.css';

export const InfinityPreloader : React.FC = () => {
    return(
        <div className="infinity-preloader-div">
            <div className="bubble-loader-div">
                <div className='bubble'></div>
                <div className='bubble'></div>
                <div className='bubble'></div>
            </div>
            <div className='infinity-preloader-text'>
                <span>Loading...</span>
            </div>
        </div>
    )
}
