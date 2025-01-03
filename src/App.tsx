import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import MenuComposer from './views/MenuComposer/MenuComposer';
import Shopping from './views/Shopping/Shopping';
import FoodAndPortions from './views/FoodAndPortions/FoodAndPortions';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import './assets/styles/colors.css';

function App() {
    return (
        <Router>
            <div>
                <HeaderMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu-composer" element={<MenuComposer />} />
                    <Route path="/food-and-portions" element={<FoodAndPortions />} />
                    <Route path="/shopping" element={<Shopping />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 