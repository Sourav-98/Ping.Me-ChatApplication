
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import TextInput from 'Components/Elements/Input/TextInput/TextInput';
import './PasswordInput.css';

export default function PasswordInput({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = ()=>{
        setPasswordVisible(passwordVisible => !passwordVisible);
    };
    
    return(
        <div className="password-input-box">
            <TextInput type={ passwordVisible ? "text" : "password" } onChange={onChange} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} subLabelMessage={subLabelMessage} round={round} sm={sm} md={md} lg={lg} errorMark={errorMark}></TextInput>
            <button type="button" className={`password-visible-button ${sm === true ? 'sm' : lg === true ? 'lg' : ''}`} onClick={togglePasswordVisibility}>
                { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
            </button>                        
        </div>
    )

}
