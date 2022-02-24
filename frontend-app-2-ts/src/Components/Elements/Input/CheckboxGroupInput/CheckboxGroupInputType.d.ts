
export interface CheckboxOptionType{
    text : string,
    isSelected : boolean,
    required? : boolean
}

export interface CheckboxGroupInputType{
    optionsList : Array<CheckboxOptionType>,
    onChange : (options : Array<CheckboxOptionType>) => void
}
