import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWeightScale,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import MenuGenerator from '../../components/MenuGenerator/MenuGenerator';
import LinkButton from '../../components/LinkButton/LinkButton';
import Carousel from '../../components/Carousel/Carousel';
import { products } from '../../data/products';
import './Home.css';

const Home = () => {
    const [randomProducts, setRandomProducts] = useState<typeof products>([]);

    useEffect(() => {
        const shuffle = (array: typeof products) => {
            return array.sort(() => Math.random() - 0.5);
        };
        setRandomProducts(shuffle(products).slice(0, 30));
    }, []);

    return (
        <div className="home-container">
            <div className="container">
                <div className="welcome-container">
                    <div className="welcome-tag">
                        <FontAwesomeIcon icon={faWeightScale} />
                        <div className="welcome-tag-text">Pierde peso y gana energía</div>
                    </div>
                    <h1 className="welcome-title">Diseña menús saludables ilimitados en solo segundos</h1>
                    <p className="welcome-subtitle">Descubre una amplia variedad de menús saludables basados en proteínas, frutas y vegetales. Transforma tus hábitos alimenticios y aprende a realizar compras inteligentes para una vida más saludable.</p>
                    <LinkButton
                        to="/menu-composer"
                        text="Crea tus menús"
                        icon={<FontAwesomeIcon icon={faArrowRight} />}
                    />
                </div>
                <div className="section-container">
                    <MenuGenerator />
                </div>
            </div>
            <div className="products-section">
                <h2>Productos saludables</h2>
                <Carousel
                    items={randomProducts}
                    itemsPerView={4}
                    autoPlayInterval={4000}
                />
            </div>
        </div>
    );
};

export default Home; 