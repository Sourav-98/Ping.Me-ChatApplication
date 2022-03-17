import './DropDownButton.css';
import React, { useState } from 'react';

import DefaultButton from '../DefaultButton/DefaultButton';
import { CSSTransition } from 'react-transition-group';

import { DropDownButtonType } from './DropDownButtonType';
import { BsChevronDown } from 'react-icons/bs';
import {IoChevronDownOutline} from 'react-icons/io5';

const DropDownButton : React.FC<DropDownButtonType> = ({dropDownElement, disabled, onClick, onMouseUp, wide, round, outlined, primary, secondary, success, danger, warning, block, sm, md, lg, bottom, top, left, right, center, ...props}) => {

    const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

    const toggleDropDown = () => {
        setDropDownVisible(prevState => !prevState);
    }

    return(
        <div className="cm-dropdown-button-wrapper">
            <DefaultButton disabled={disabled} onClick={toggleDropDown} onMouseUp={onMouseUp} wide={wide} round={round} outlined={outlined} primary={primary} secondary={secondary} success={success} danger={danger} warning={warning} block={block} sm={sm} md={md} lg={lg}>
                {props.children}
                <div className={`cm-dropdown-chevron-container ${dropDownVisible ? 'up' : 'down'}`}>
                    <IoChevronDownOutline></IoChevronDownOutline>
                </div>
            </DefaultButton>
            <CSSTransition
                in={dropDownVisible}
                timeout={178}
                classNames="dropdown-fade"
                unmountOnExit
            >
                <div className={`cm-dropdown-button-menu-container ${right ? 'right' : 'left'}`}>
                    {dropDownElement}
                </div>
            </CSSTransition>
        </div>
    )
}

export default DropDownButton;
