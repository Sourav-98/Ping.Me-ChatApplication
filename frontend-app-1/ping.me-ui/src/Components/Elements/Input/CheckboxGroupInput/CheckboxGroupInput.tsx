
import { MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';

import { CgAsterisk } from 'react-icons/cg';
import './CheckboxGroupInput.css';

import { CheckboxGroupInputType, CheckboxOptionType } from './CheckboxGroupInputType';

const CheckboxGroupInput : React.FC<CheckboxGroupInputType> = ({optionsList, onChange, ...props}) => {
    /** optionToggler -> handles the change in the list of selected options */
    const optionToggler = (optionIndex : number) : void => {
        let tempOptions : Array<CheckboxOptionType> = [...optionsList];
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

export default CheckboxGroupInput;