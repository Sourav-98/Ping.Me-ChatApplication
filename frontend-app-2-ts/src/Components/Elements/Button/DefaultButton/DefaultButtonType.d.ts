import React from "react";

export interface DefaultButtonType {
    // disabled, onClick, onMouseUp, wide, round, outlined, primary, secondary, success, danger, alert, text, block, sm, md, lg,
    disabled? : boolean,
    wide? : boolean,
    block? : boolean,
    round? : boolean,
    outlined? : boolean,
    primary? : boolean,
    secondary? : boolean,
    success? : boolean,
    danger? : boolean,
    warning? : boolean,
    sm? : boolean,
    md? : boolean,
    lg? : boolean,
    onClick? : React.MouseEventHandler,
    onMouseUp? : React.MouseEventHandler,
    children? : React.ReactNode
}