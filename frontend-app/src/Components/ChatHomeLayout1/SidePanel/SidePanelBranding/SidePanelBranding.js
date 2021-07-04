
import './SidePanelBranding.css';

import pingMeBrand from './../../../../assets/ping.Me Logo NEW 3.png';

export default function SidePanelBranding(){
    return(
        <div className="side-panel-branding">
            <img src={pingMeBrand}></img>
            {/* <h2>Ping.Me</h2> */}
        </div>
    )
}
