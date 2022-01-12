
import { useState, useEffect} from 'react';

import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoCheckmarkCircleSharp, IoEllipseOutline} from 'react-icons/io5';
import './CheckboxGroup.css';

// options = Array<string>
export function CheckboxGroup({optionsList, onChange, ...props}){

    const [options, setOptions] = useState([]);

    useEffect(()=>{
        setOptions(optionsList);
    }, []);

    const optionToggler = (optionIndex)=>{
        let tempOptions = [...options];
        tempOptions[optionIndex].isSelected = !tempOptions[optionIndex].isSelected;
        setOptions(tempOptions);
        onChange(options);
    }

    return(
        <div className='checkbox-input-group'>
        {options.map((option, index) => 
            <div key={option.text + index.toString()} className='checkbox-input-item'>
                <div className='checkbox-input-icon-div' onClick={()=>{optionToggler(index)}}>{ option.isSelected ? <IoCheckmarkCircleSharp></IoCheckmarkCircleSharp> : <IoEllipseOutline></IoEllipseOutline> }</div>
                <div className='checkbox-input-text'>{option.text}</div>
            </div>
        )}
        </div>
    )
}