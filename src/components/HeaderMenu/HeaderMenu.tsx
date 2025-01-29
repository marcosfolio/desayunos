import React from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from '../../helpers/menuItems';
import './HeaderMenu.css';

const HeaderMenu = () => {
    return (
        <nav className="header-menu">
            <ul className="menu-list">
                <li>
                    <NavLink to={MENU_ITEMS.HOME.path}>{MENU_ITEMS.HOME.es}</NavLink>
                </li>
                <li>
                    <NavLink to={MENU_ITEMS.SHOPPING.path}>{MENU_ITEMS.SHOPPING.es}</NavLink>
                </li>
                <li>
                    <NavLink to={MENU_ITEMS.MENU_COMPOSER.path}>{MENU_ITEMS.MENU_COMPOSER.es}</NavLink>
                </li>
                <li>
                    <NavLink to={MENU_ITEMS.FOOD_AND_PORTIONS.path}>{MENU_ITEMS.FOOD_AND_PORTIONS.es}</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu; 