
import './TextInput.css';

import React, { ReactElement } from 'react';

import { TextInputType } from './TextInputType';

const TextInput1 : React.FC<TextInputType> = function({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, children, ...props}) : ReactElement{
    return (
        <div className='cm-input-div'>
            <input type={type ? 'text' : ''} placeholder={placeholder} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={`cm-input${ round === true ? ' round' : ''}${errorMark === true ? ' danger' : subLabelMessage ? ' success' : ''}${ sm === true ? ' sm' : lg === true ? ' lg' : ''}`}></input>
            <span className={`sub-label-span-text ${ errorMark ? 'danger' : 'success'}`}>{subLabelMessage}</span>
        </div>
    )
}

export default TextInput1;
