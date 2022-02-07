
import './TextInput1.css';

import { CSSTransition } from 'react-transition-group';

export default function TextInput1({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    return(
        <div className='cm-input-div'>
            <input type={type} placeholder={placeholder} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={`cm-input${ round === true ? ' round' : ''}${errorMark === true ? ' danger' : subLabelMessage ? ' success' : ''}${ sm === true ? ' sm' : lg === true ? ' lg' : ''}`}></input>
            <CSSTransition
                classNames="sub-label-span-div"
                in={subLabelMessage != undefined}
                timeout={300}
                unmountOnExit
            >
                <span className={`sub-label-span-text ${ errorMark ? 'danger' : 'success'}`}>{subLabelMessage}</span>
                
            </CSSTransition>
            
        </div>
    )
}
