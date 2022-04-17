import { IconType } from "react-icons";

export interface NavbarNavItem{
    tagName : string,
    routePath? : string,
    navIcon : IconType
    shiftToEnd? : boolean,
    isActive? : boolean
}