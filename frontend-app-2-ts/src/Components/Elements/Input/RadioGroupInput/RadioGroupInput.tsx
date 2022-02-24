import './RadioGroupInput.css';

import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';

import { RadioGroupInputType } from './RadioGroupInputType';


const RadioGroupInput : React.FC<RadioGroupInputType> = ({optionsList, onChange, ...props}) => {

        /** optionToggler - handles the change in the selected option */
    const optionToggler = (optionIndex : number) => {
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

export default RadioGroupInput;
