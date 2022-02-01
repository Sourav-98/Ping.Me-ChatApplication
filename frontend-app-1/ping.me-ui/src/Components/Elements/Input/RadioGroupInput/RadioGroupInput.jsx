import './RadioGroupInput.css';

import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';

/**
 * RadioGroupInput - a React implementation for radio button input
 * param - optionsList -> a list of options containing an object {text: string, isSelected : boolean}
 * param -> onChange -> a function passed down by the parent component to handle the change in the selected option
 */
export default function RadioGroupInput({optionsList, onChange, ...props}){
    
    /** optionToggler - handles the change in the selected option */
    const optionToggler = (optionIndex) => {
        onChange(optionsList.filter((option, index) => {
            if(index === optionIndex){
                option.isSelected = true;
            }
            else{
                option.isSelected = false;
            }
            return option;
        }));
    }

    return(
        <div className='radio-input-group'>
        {optionsList.map((option, index) => 
            <div key={option.text + index.toString()} className='radio-input-item'>
                <div className='radio-input-icon-div' onClick={()=>{optionToggler(index)}}>{ option.isSelected ? <IoMdRadioButtonOn></IoMdRadioButtonOn> : <IoMdRadioButtonOff></IoMdRadioButtonOff> }</div>
                <div className='radio-input-text'>{option.text}</div>
            </div>
        )}
        </div>
    )
}