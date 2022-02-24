import React from "react";

export interface AlertTemplateType {
    outlined? : boolean,
    closeFunc : () => void,
    autoClose? : boolean,
    primary? : boolean,
    secondary? : boolean,
    success? : boolean,
    danger? : boolean,
    warning? : boolean,
    children? : React.ReactNode
}