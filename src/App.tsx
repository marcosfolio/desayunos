import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Food from './views/Food/Food';
import Shopping from './views/Shopping/Shopping';
import MenuComposer from './views/MenuComposer/MenuComposer';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';

function App() {
    return (
        <Router>
            <div>
                <HeaderMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/food" element={<Food />} />
                    <Route path="/menu" element={<MenuComposer />} />
                    <Route path="/shopping" element={<Shopping />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 