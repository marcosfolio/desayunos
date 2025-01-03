import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
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
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
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