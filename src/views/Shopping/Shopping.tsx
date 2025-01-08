import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExternalLink,
    faDrumstickBite,
    faBreadSlice
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import './Shopping.css';
import { products } from '../../data/products';

const Shopping = () => {
    return (
        <div className="shopping-container">
            <h1 className="shopping-title">Shopping</h1>
            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <div className="product-tag" data-type={product.type}>
                            <FontAwesomeIcon
                                icon={product.type === 'protein' ? faDrumstickBite : faBreadSlice}
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
                                            <td>{product.nutrition.energia}kcal</td>
                                        </tr>
                                        <tr>
                                            <td>Grasas</td>
                                            <td>{product.nutrition.grasas}g</td>
                                        </tr>
                                        <tr className="warning">
                                            <td>Grasas saturadas</td>
                                            <td>{product.nutrition.grasasSaturadas}g</td>
                                        </tr>
                                        <tr className="success">
                                            <td>Grasas insaturadas</td>
                                            <td>{product.nutrition.grasasInsaturadas}g</td>
                                        </tr>
                                        <tr>
                                            <td>Hidratos de carbono</td>
                                            <td>{product.nutrition.hidratosCarbono}g</td>
                                        </tr>
                                        <tr className="warning">
                                            <td>Azúcares</td>
                                            <td>{product.nutrition.azucares}g</td>
                                        </tr>
                                        <tr>
                                            <td>Proteínas</td>
                                            <td>{product.nutrition.proteinas}g</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <LinkButton
                            href={product.link}
                            text="Buy on Amazon"
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