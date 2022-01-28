
import './TextInput.css';

export function TextInput({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    return(
        <div className='cm-input-div'>
            <input type={type} placeholder={placeholder} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={`cm-input${ round === true ? ' round' : ''}${errorMark === true ? ' danger' : subLabelMessage ? ' success' : ''}${ sm === true ? ' sm' : lg === true ? ' lg' : ''}`}></input>
            <span className={`sub-label-span ${ errorMark ? 'danger' : 'success'}`}>{subLabelMessage}</span>
        </div>
    )
}
