import React from "react";

export interface AlertType {
    message? : string,
    isVisible? : boolean, 
    closeFunc : () => void, 
    autoClose? : boolean, 
    delay? : number, 
    topLeft? : boolean, 
    topCenter? : boolean, 
    topRight? : boolean, 
    bottomRight? : boolean, 
    bottomCenter? : boolean, 
    bottomLeft? : boolean, 
    outlined? : boolean, 
    primary? : boolean, 
    secondary? : boolean, 
    success? : boolean, 
    danger? : boolean, 
    warning? : boolean, 
    children? : React.ReactNode, 
}
