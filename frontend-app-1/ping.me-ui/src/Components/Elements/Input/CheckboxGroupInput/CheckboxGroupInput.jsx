
import { MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';

import { CgAsterisk } from 'react-icons/cg';
import './CheckboxGroupInput.css';

/**
 * CheckboxGroupInput - a React implementation for checkbox input
 * param - optionsList -> a list of options of type Array<{text: string, isSelected: boolean, [required: boolean]}>
 * param -> onChange -> a function passed down by the parent component to handle the change in the selected option
 */
export default function CheckboxGroupInput({optionsList, onChange, ...props}){
    
    /** optionToggler -> handles the change in the list of selected options */
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