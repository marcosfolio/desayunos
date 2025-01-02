import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.css';

const HeaderMenu = () => {
    return (
        <nav className="header-menu">
            <ul className="menu-list">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/menu-composer">Menu Composer</NavLink>
                </li>
                <li>
                    <NavLink to="/food-and-portions">Food & Portions</NavLink>
                </li>
                <li>
                    <NavLink to="/shopping">Shopping</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu; 