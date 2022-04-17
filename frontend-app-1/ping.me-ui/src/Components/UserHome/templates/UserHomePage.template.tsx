import React from 'react';
import './UserHomePageTemplate.css';

import { NavbarConfig } from '../NavbarConfig/Navbar.config';

import { Navbar, NavbarNavItem } from 'UI/Navigation';

import { useLocation } from 'react-router';

const UserHomePageTemplate : React.FC = ({...props}) => {

    const currentRoute = useLocation();

    const navList : Array<NavbarNavItem> = [];

    // initialize the Navbar contents
    NavbarConfig.map((item) => {
        navList.push(
            {
                tagName : item.tagName,
                routePath : "." + item.routePath,
                navIcon : item.navIcon,
                isActive : currentRoute.pathname.includes(item.routePath),
                shiftToEnd : item.shiftToEnd
            }
        )
    });

    return (
        <div className="user-home-container">
            <div className="user-home-navbar-container">
                <Navbar dark vertical navList={navList}></Navbar>
            </div>
            <div className="user-home-content-container">
                {props.children}
            </div>
        </div>
    );
}

export default UserHomePageTemplate;
