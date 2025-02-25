import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MENU_ITEMS } from '../../helpers/menuItems';
import LoginComponent from '../LoginComponent/LoginComponent';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HeaderMenu.css';

const HeaderMenu = () => {
    const { user } = useAuth();

    return (
        <nav className="header-menu">
            <div className="logo-container">
                <FontAwesomeIcon icon={faBasketShopping} className="app-logo" />
                <span className="app-title">La Compra Healthy</span>
            </div>
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
                {user && (
                    <li>
                        <NavLink to={MENU_ITEMS.UPLOAD_PRODUCT.path}>{MENU_ITEMS.UPLOAD_PRODUCT.es}</NavLink>
                    </li>
                )}
                <li className="login-section">
                    <LoginComponent />
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu; 