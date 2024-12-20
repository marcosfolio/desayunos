import React from 'react';
import './Shopping.css';
import { products } from '../../data/products';

const Shopping = () => {
    return (
        <div className="shopping-container">
            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                            Buy on Amazon
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shopping; 