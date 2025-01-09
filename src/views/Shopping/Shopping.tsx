import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExternalLink,
    faDrumstickBite,
    faBreadSlice,
    faCarrot
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import './Shopping.css';
import { products } from '../../data/products';

type ProductType = 'all' | 'vegetable' | 'carbohydrate' | 'protein';

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const Shopping = () => {
    const [selectedType, setSelectedType] = useState<ProductType>('all');

    const shuffledProducts = useMemo(() => shuffleArray(products), []);

    const filteredProducts = shuffledProducts.filter(product =>
        selectedType === 'all' ? true : product.type === selectedType
    );

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'protein':
                return faDrumstickBite;
            case 'carbohydrate':
                return faBreadSlice;
            case 'vegetable':
                return faCarrot;
            default:
                return faBreadSlice;
        }
    };

    return (
        <div className="shopping-container">
            <h1 className="shopping-title">Shopping</h1>
            <div className="filter-menu">
                <button
                    className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedType('all')}
                >
                    Ver todos
                </button>
                <button
                    className={`filter-button ${selectedType === 'vegetable' ? 'active' : ''}`}
                    onClick={() => setSelectedType('vegetable')}
                >
                    Vegetales
                </button>
                <button
                    className={`filter-button ${selectedType === 'carbohydrate' ? 'active' : ''}`}
                    onClick={() => setSelectedType('carbohydrate')}
                >
                    Carbohidratos
                </button>
                <button
                    className={`filter-button ${selectedType === 'protein' ? 'active' : ''}`}
                    onClick={() => setSelectedType('protein')}
                >
                    Proteínas
                </button>
            </div>
            <div className="product-grid">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="product-tag" data-type={product.type}>
                            <FontAwesomeIcon
                                icon={getTypeIcon(product.type)}
                                className="product-tag-icon"
                            />
                            <span>{product.type}</span>
                        </div>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        {product.nutrition && (
                            <div className="nutrition-table">
                                <h4>Tabla nutricional por 100g</h4>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Energía</td>
                                            <td>{product.nutrition.energia} kcal</td>
                                        </tr>
                                        <tr>
                                            <td>Grasas</td>
                                            <td>{product.nutrition.grasas} g</td>
                                        </tr>
                                        <tr className="warning">
                                            <td>Grasas saturadas</td>
                                            <td>{product.nutrition.grasasSaturadas} g</td>
                                        </tr>
                                        <tr className="success">
                                            <td>Grasas insaturadas</td>
                                            <td>{product.nutrition.grasasInsaturadas} g</td>
                                        </tr>
                                        <tr>
                                            <td>Hidratos de carbono</td>
                                            <td>{product.nutrition.hidratosCarbono} g</td>
                                        </tr>
                                        <tr className="warning">
                                            <td>Azúcares</td>
                                            <td>{product.nutrition.azucares} g</td>
                                        </tr>
                                        <tr>
                                            <td>Proteínas</td>
                                            <td>{product.nutrition.proteinas} g</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <LinkButton
                            href={product.link}
                            text={product.link.includes('mercadona') ? 'Comprar en Mercadona' : 'Comprar en Amazon'}
                            icon={<FontAwesomeIcon icon={faExternalLink} />}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shopping; 