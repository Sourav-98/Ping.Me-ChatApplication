import { IconType } from "react-icons";

import {BsFillChatLeftTextFill} from 'react-icons/bs';
import {FaCog, FaVideo} from 'react-icons/fa';
import {MdWifiCalling3} from 'react-icons/md';

export const NavbarConfig : Array<{tagName : string, routePath : string, navIcon : IconType, shiftToEnd? : boolean}> = [
    {
        tagName : "Dasboard",
        routePath : "/dashboard",
        navIcon : BsFillChatLeftTextFill
    },
    {
        tagName : "Calls",
        routePath : "/calls",
        navIcon : MdWifiCalling3
    },
    {
        tagName : "Videos",
        routePath : "/videos",
        navIcon : FaVideo
    },
    {
        tagName : "Settings",
        routePath : "/settings",
        navIcon : FaCog,
        shiftToEnd : true
    },
]
