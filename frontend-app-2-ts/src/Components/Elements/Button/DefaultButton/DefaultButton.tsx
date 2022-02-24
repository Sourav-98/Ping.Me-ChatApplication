
import './DefaultButton.css';
import { DefaultButtonType } from './DefaultButtonType';

const DefaultButton : React.FC<DefaultButtonType> = ({disabled, onClick, onMouseUp, wide, round, outlined, primary, secondary, success, danger, warning, block, sm, md, lg, ...props}) => {
    return(
        <button disabled={disabled} onClick={onClick} onMouseUp={onMouseUp} className={`cm-button${wide === true ? ' wide' : ''}${round === true ? ' round' : ''}${outlined === true ? ' outlined' : ''}${block === true ? ' block' : ''}${sm ? ' sm' : lg ? ' lg' : ' md'}${primary === true ? ' primary' : secondary === true ? ' secondary' : success === true ? ' success' : danger === true ? ' danger' : warning === true ? ' alert' : ''}`}>{props.children}</button>
    )
}

export default DefaultButton;
