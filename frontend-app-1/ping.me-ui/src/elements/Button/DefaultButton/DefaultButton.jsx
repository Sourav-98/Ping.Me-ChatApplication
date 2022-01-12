
import './DefaultButton.css';

export function DefaultButton({onClick, wide, round, outlined, primary, secondary, success, danger, alert, text, block, sm, md, lg, ...props}){
    return(
        <button onClick={onClick} className={`cm-button ${wide === true ? 'wide' : ''} ${round === true ? 'round' : ''} ${outlined === true ? 'outlined' : ''} ${block === true ? 'block' : ''} ${primary === true ? 'primary' : secondary === true ? 'secondary' : success === true ? 'success' : danger === true ? 'danger' : alert === true ? 'alert' : ''}`}>{text}</button>
    )
}
