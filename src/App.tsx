import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Food from './pages/Food/Food';
import Shopping from './pages/Shopping/Shopping';
import MenuComposer from './pages/MenuComposer/MenuComposer';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/food">Food</Link>
                        </li>
                        <li>
                            <Link to="/menu">Menu Composer</Link>
                        </li>
                        <li>
                            <Link to="/shopping">Shopping</Link>
                        </li>
                    </ul>
                </nav>

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