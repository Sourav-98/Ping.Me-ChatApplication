
import './TextInput1.css';

import React, { ReactElement } from 'react';

import { CSSTransition } from 'react-transition-group';

import { TextInput1Type } from './TextInput1Type';

const TextInput1 : React.FC<TextInput1Type> = function({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, children, ...props}) : ReactElement{
    return (
        <div className='cm-input-div'>
            <input type={type ? 'text' : ''} placeholder={placeholder} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={`cm-input${ round === true ? ' round' : ''}${errorMark === true ? ' danger' : subLabelMessage ? ' success' : ''}${ sm === true ? ' sm' : lg === true ? ' lg' : ''}`}></input>
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

export default TextInput1;
