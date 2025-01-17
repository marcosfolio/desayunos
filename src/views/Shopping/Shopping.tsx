import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExternalLink,
    faDrumstickBite,
    faBreadSlice,
    faFire,
    faCarrot
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import Table, { TableRow } from '../../components/Table/Table';
import './Shopping.css';
import { products } from '../../data/products';
import FilterButton from '../../components/FilterButton/FilterButton';

type ProductType = 'all' | 'protein' | 'vegetable' | 'carbohydrate' | 'fat';

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
            case 'fat':
                return faFire;
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
                type: nutrition.grasasSaturadas === 0 ? 'success' :
                    nutrition.grasasSaturadas > 5 ? 'danger' :
                        'warning'
            },
            {
                cells: ['Grasas insaturadas', `${nutrition.grasasInsaturadas} g`],
                type: 'success'
            },
            { cells: ['Hidratos de carbono', `${nutrition.hidratosCarbono} g`], type: 'regular' },
            {
                cells: ['Azúcares', `${nutrition.azucares} g`],
                type: nutrition.azucares === 0 ? 'success' :
                    nutrition.azucares > 5 ? 'danger' :
                        'warning'
            },
            { cells: ['Proteínas', `${nutrition.proteinas} g`], type: 'regular' }
        ];

        return <Table headers={headers} rows={rows} />;
    };

    const filterButtons = [
        { type: 'all' as const, label: 'Ver todos' },
        { type: 'protein' as const, label: 'Proteínas' },
        { type: 'vegetable' as const, label: 'Vegetales' },
        { type: 'carbohydrate' as const, label: 'Carbohidratos' },
        { type: 'fat' as const, label: 'Grasas buenas' }
    ];

    return (
        <div className="shopping-container">
            <h1 className="shopping-title">Shopping</h1>
            <div className="filter-menu">
                {filterButtons.map(({ type, label }) => (
                    <FilterButton
                        key={type}
                        type={type}
                        selectedType={selectedType}
                        onClick={() => setSelectedType(type)}
                    >
                        {label}
                    </FilterButton>
                ))}
            </div>
            <div className="product-grid">
                {filteredProducts.map((product, index) => (
                    <div key={product.id} className="product-card">
                        <div className="product-tag" data-type={product.type}>
                            <FontAwesomeIcon
                                icon={getTypeIcon(product.type)}
                                className="product-tag-icon"
                            />
                        </div>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        <div className="meal-tags">
                            {product.typeOfMeal.map((meal, index) => (
                                <span key={index} className="meal-tag">
                                    {meal}
                                </span>
                            ))}
                        </div>
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