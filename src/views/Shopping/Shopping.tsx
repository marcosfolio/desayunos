import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExternalLink,
    faDrumstickBite,
    faBreadSlice,
    faCarrot
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import Table, { TableRow } from '../../components/Table/Table';
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

    const getNutritionTable = (nutrition: {
        energia: number;
        grasas: number;
        grasasSaturadas: number;
        grasasInsaturadas: number;
        hidratosCarbono: number;
        azucares: number;
        proteinas: number;
    }) => {
        const headers = ['Nutriente', 'Cantidad'];
        const rows: TableRow[] = [
            { cells: ['Energía', `${nutrition.energia} kcal`], type: 'regular' },
            { cells: ['Grasas', `${nutrition.grasas} g`], type: 'regular' },
            {
                cells: ['Grasas saturadas', `${nutrition.grasasSaturadas} g`],
                type: 'warning'
            },
            {
                cells: ['Grasas insaturadas', `${nutrition.grasasInsaturadas} g`],
                type: 'success'
            },
            { cells: ['Hidratos de carbono', `${nutrition.hidratosCarbono} g`], type: 'regular' },
            {
                cells: ['Azúcares', `${nutrition.azucares} g`],
                type: 'warning'
            },
            { cells: ['Proteínas', `${nutrition.proteinas} g`], type: 'regular' }
        ];

        return <Table headers={headers} rows={rows} />;
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
                                {getNutritionTable(product.nutrition)}
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