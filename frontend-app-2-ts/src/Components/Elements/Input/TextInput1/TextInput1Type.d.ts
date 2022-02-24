import React, { ChangeEventHandler, FocusEventHandler } from 'react';

export interface TextInput1Type {
    type? : string,
    placeholder : string,
    subLabelMessage? : string,
    errorMark : boolean,
    onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void,
    onFocus? : (event : React.ChangeEvent<HTMLInputElement>) => void,
    onBlur? : (event : React.ChangeEvent<HTMLInputElement>) => void,
    round? : boolean,
    sm? : boolean,
    md? : boolean,
    lg? : boolean,
    children? : React.ReactNode
}