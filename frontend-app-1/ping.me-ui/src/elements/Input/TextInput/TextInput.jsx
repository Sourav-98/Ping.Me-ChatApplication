
import { } from 'react-transition-group';
import { useState, useLayoutEffect } from 'react';
import './TextInput.css';

export function TextInput({type, placeholder, onChange, onFocus, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    return(
        <div className='cm-input-div'>
            <input type={type} placeholder={placeholder} onChange={onChange} onFocus={onFocus} className={`cm-input${ round == true ? ' round' : ''}${errorMark == true ? ' danger' : ''}${ sm === true ? ' sm' : lg === true ? ' lg' : ''}`}></input>
            <span className='sub-error-label'>{subLabelMessage}</span>
        </div>
    )
}
