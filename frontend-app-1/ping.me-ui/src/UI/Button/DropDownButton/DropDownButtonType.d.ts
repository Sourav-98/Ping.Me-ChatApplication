
import React from "react";
import { DefaultButtonType } from "../DefaultButton/DefaultButtonType";

export interface DropDownButtonType extends DefaultButtonType{
    bottom? : boolean,
    top? : boolean,
    left? : boolean,
    right? : boolean,
    center? : boolean,
    dropDownElement ? : React.ReactElement
}