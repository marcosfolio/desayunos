import React from 'react';
import MenuGenerator from '../../components/MenuGenerator/MenuGenerator';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="welcome-title">Bienvenido</h1>
            <MenuGenerator />
        </div>
    );
};

export default Home; 