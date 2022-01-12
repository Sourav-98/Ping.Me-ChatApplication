
import './TextInput.css';

export function TextInput({type, placeholder, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    return(
        <div className='cm-input-div'>
            <input type={type} placeholder={placeholder} className={`cm-input ${ round == true ? 'round' : ''} ${errorMark == true ? 'danger' : ''} ${ sm === true ? 'sm' : lg === true ? 'lg' : ''}`}></input>
            {/* { subLabelMessage && <span className='sub-label'>{subLabelMessage}</span>} */}
            <span className='sub-label'>{subLabelMessage}</span>
        </div>
    )
}
