import React from 'react';
import './Navbar.css';

import logo from 'assets/ping.Me Logo NEW 3.png';

import { Link } from 'react-router-dom';

import { NavbarNavItem } from './NavbarNavType';

const Navbar : React.FC<{dark? : boolean, vertical? : boolean, navList : Array<NavbarNavItem>}> = ({dark, vertical, navList, ...props}) => {
    return (
        <div className={`navbar-container${dark ? ' dark' : ''}${ vertical ? ' vertical' : ' horizontal'}`}>
            <div className="navbar-branding">
                <img src={logo}></img>
            </div>
            {
                navList.map((navItem, index) => 
                (
                    <div key={index} className={`navbar-nav-item${ navItem.shiftToEnd ? ' last' : ''}${navItem.isActive ? ' active' : ''}`}>
                        <Link to={navItem.routePath ? navItem.routePath : '.'}><navItem.navIcon></navItem.navIcon></Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Navbar;
