import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.css';

const HeaderMenu = () => {
    return (
        <nav className="header-menu">
            <ul className="menu-list">
                <li>
                    <NavLink to="/">Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/shopping">La compra saludable</NavLink>
                </li>
                <li>
                    <NavLink to="/menu-composer">Creador de menús</NavLink>
                </li>
                <li>
                    <NavLink to="/food-and-portions">¿Cómo comer?</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu; 