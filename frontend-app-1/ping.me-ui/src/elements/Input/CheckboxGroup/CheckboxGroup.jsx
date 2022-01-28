
import { MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';

import { CgAsterisk } from 'react-icons/cg';
import './CheckboxGroup.css';

// options = Array<{text: , isSelected: }>
export function CheckboxGroup({optionsList, onChange, ...props}){

    const optionToggler = (optionIndex)=>{
        let tempOptions = [...optionsList];
        tempOptions[optionIndex].isSelected = !tempOptions[optionIndex].isSelected;
        onChange(tempOptions);
    }

    return(
        <div className='checkbox-input-group'>
        {optionsList.map((option, index) => 
            <div key={option.text + index.toString()} className='checkbox-input-item'>
                <div className='checkbox-input-icon-div' onClick={()=>{optionToggler(index)}}>{ option.isSelected ? <MdCheckBox></MdCheckBox> : <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank> }</div>
                <div className='checkbox-input-text'>{option.text} {option.required ? <div><CgAsterisk></CgAsterisk></div> : <></>}</div>
            </div>
        )}
        </div>
    )
}