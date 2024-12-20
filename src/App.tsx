import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shopping from './pages/Shopping/Shopping';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <nav className="nav-menu">
                    <Link to="/">Generador de desayunos</Link>
                    <Link to="/shop">La Compra</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shopping />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App; 