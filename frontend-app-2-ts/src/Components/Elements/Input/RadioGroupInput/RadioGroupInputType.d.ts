export interface RadioOptionType{
    text : string,
    isSelected : boolean
}

export interface RadioGroupInputType{
    optionsList : Array<RadioOptionType>,
    onChange : (options : Array<RadioOptionType>) => void
}