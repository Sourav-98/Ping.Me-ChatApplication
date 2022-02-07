
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import TextInput1 from 'Components/Elements/Input/TextInput1/TextInput1';
import './PasswordInput1.css';

export default function PasswordInput1({type, placeholder, onChange, onFocus, onBlur, subLabelMessage, round, sm, md, lg, errorMark, ...props}){

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = ()=>{
        setPasswordVisible(passwordVisible => !passwordVisible);
    };
    
    return(
        <div className="password-input-box">
            <TextInput1 type={ passwordVisible ? "text" : "password" } onChange={onChange} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} subLabelMessage={subLabelMessage} round={round} sm={sm} md={md} lg={lg} errorMark={errorMark}></TextInput1>
            <button type="button" className={`password-visible-button ${sm === true ? 'sm' : lg === true ? 'lg' : ''}`} onClick={togglePasswordVisibility}>
                { passwordVisible ? <IoEyeOutline></IoEyeOutline> : <IoEyeOffOutline></IoEyeOffOutline> }
            </button>                        
        </div>
    )

}
