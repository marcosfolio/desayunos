import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import MenuGenerator from '../../components/MenuGenerator/MenuGenerator';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="welcome-container">
                <div className="welcome-tag">
                    <FontAwesomeIcon icon={faWeightScale} />
                    <div className="welcome-tag-text">Pierde peso y gana energía</div>
                </div>
                <h1 className="welcome-title">Diseña menús saludables ilimitados en solo segundos</h1>
                <p className="welcome-subtitle">Descubre una amplia variedad de menús saludables basados en proteínas, frutas y vegetales. Transforma tus hábitos alimenticios y aprende a realizar compras inteligentes para una vida más saludable.</p>
            </div>
            <div className="menu-generator-container">
                <MenuGenerator />
            </div>
        </div>
    );
};

export default Home; 