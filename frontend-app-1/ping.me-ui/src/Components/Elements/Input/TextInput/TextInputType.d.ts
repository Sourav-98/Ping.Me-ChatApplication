export interface TextInputType{
    type? : string,
    placeholder : string,
    subLabelMessage? : string,
    errorMark : boolean,
    onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void,
    onFocus? : (event? : React.ChangeEvent<HTMLInputElement>) => void,
    onBlur? : (event? : React.ChangeEvent<HTMLInputElement>) => void,
    round? : boolean,
    sm? : boolean,
    md? : boolean,
    lg? : boolean,
    children? : React.ReactNode
}