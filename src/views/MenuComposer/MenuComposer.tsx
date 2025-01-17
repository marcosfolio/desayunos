import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExternalLink,
    faDrumstickBite,
    faBreadSlice,
    faFire,
    faCarrot,
    faRotate
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/LinkButton/LinkButton';
import { products } from '../../data/products';
import './MenuComposer.css';
import Table, { TableRow } from '../../components/Table/Table';
import FilterButton from '../../components/FilterButton/FilterButton';

type Goal = 'perder' | 'energia';

const MenuComposer = () => {
    const [breakfastMenu, setBreakfastMenu] = useState<typeof products>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [goal, setGoal] = useState<Goal>('perder');

    // Generate initial menu on component mount
    useEffect(() => {
        generateInitialBreakfast();
    }, []);

    const generateInitialBreakfast = () => {
        const initialMenu = generateMenuItems();
        setBreakfastMenu(initialMenu);
    };

    const generateMenuItems = () => {
        const carbs = products.filter(product =>
            product.type === 'carbohydrate' &&
            product.typeOfMeal.includes('desayuno')
        );
        const proteins = products.filter(product =>
            product.type === 'protein' &&
            product.typeOfMeal.includes('desayuno')
        );
        const vegetables = products.filter(product =>
            product.type === 'vegetable' &&
            product.typeOfMeal.includes('desayuno')
        );

        const randomCarb = carbs[Math.floor(Math.random() * carbs.length)];
        const randomProtein = proteins[Math.floor(Math.random() * proteins.length)];
        const randomVegetable = vegetables[Math.floor(Math.random() * vegetables.length)];

        return [randomCarb, randomProtein, randomVegetable].filter(Boolean);
    };

    const generateBreakfast = () => {
        setIsGenerating(true);

        // Generate random menus quickly for animation effect
        const animationInterval = setInterval(() => {
            setBreakfastMenu(generateMenuItems());
        }, 100);

        // Stop after 1 second and set final menu
        setTimeout(() => {
            clearInterval(animationInterval);
            setBreakfastMenu(generateMenuItems());
            setIsGenerating(false);
        }, 1000);
    };

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

    const calculateTotalNutrition = () => {
        return breakfastMenu.reduce((total, product) => {
            const multiplier =
                product.type === 'carbohydrate' ? (goal === 'perder' ? 0.2 : 0.3) :
                    product.type === 'protein' ? (goal === 'perder' ? 1 : 2.4) :
                        product.type === 'vegetable' ? 1.8 : 0;

            return {
                energia: total.energia + (product.nutrition.energia * multiplier),
                grasas: total.grasas + (product.nutrition.grasas * multiplier),
                grasasSaturadas: total.grasasSaturadas + (product.nutrition.grasasSaturadas * multiplier),
                grasasInsaturadas: total.grasasInsaturadas + (product.nutrition.grasasInsaturadas * multiplier),
                hidratosCarbono: total.hidratosCarbono + (product.nutrition.hidratosCarbono * multiplier),
                azucares: total.azucares + (product.nutrition.azucares * multiplier),
                proteinas: total.proteinas + (product.nutrition.proteinas * multiplier),
            };
        }, {
            energia: 0,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 0,
        });
    };

    const getNutritionTable = (nutrition: ReturnType<typeof calculateTotalNutrition>) => {
        const headers = ['Nutriente', 'Cantidad'];
        const rows: TableRow[] = [
            { cells: ['Energía', `${Math.round(nutrition.energia)} kcal`], type: 'regular' },
            { cells: ['Grasas', `${Math.round(nutrition.grasas * 10) / 10} g`], type: 'regular' },
            {
                cells: ['Grasas saturadas', `${Math.round(nutrition.grasasSaturadas * 10) / 10} g`],
                type: nutrition.grasasSaturadas === 0 ? 'success' :
                    nutrition.grasasSaturadas > 5 ? 'danger' :
                        'warning'
            },
            {
                cells: ['Grasas insaturadas', `${Math.round(nutrition.grasasInsaturadas * 10) / 10} g`],
                type: 'success'
            },
            { cells: ['Hidratos de carbono', `${Math.round(nutrition.hidratosCarbono * 10) / 10} g`], type: 'regular' },
            {
                cells: ['Azúcares', `${Math.round(nutrition.azucares * 10) / 10} g`],
                type: nutrition.azucares === 0 ? 'success' :
                    nutrition.azucares > 5 ? 'danger' :
                        'warning'
            },
            { cells: ['Proteínas', `${Math.round(nutrition.proteinas * 10) / 10} g`], type: 'regular' }
        ];

        return <Table headers={headers} rows={rows} />;
    };

    return (
        <div className="menu-composer-container">
            <section className="menu-section">
                <h1>Desayuno</h1>
                <div className="goals-filter">
                    <FilterButton
                        type="perder"
                        selectedType={goal}
                        onClick={() => setGoal('perder')}
                    >
                        Perder peso
                    </FilterButton>
                    <FilterButton
                        type="energia"
                        selectedType={goal}
                        onClick={() => setGoal('energia')}
                    >
                        Ganar energía
                    </FilterButton>
                </div>
                <div className="product-grid">
                    {breakfastMenu.map((product, index) => (
                        <div key={index} className={`product-card ${isGenerating ? 'generating' : ''}`}>
                            <div className="product-tag" data-type={product.type}>
                                <FontAwesomeIcon
                                    icon={getTypeIcon(product.type)}
                                    className="product-tag-icon"
                                />
                            </div>
                            <h3>{product.name}</h3>
                            <img src={product.image} alt={product.name} />
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
                <div className="button-container">
                    <button
                        onClick={generateBreakfast}
                        className={`generate-button ${isGenerating ? 'generating' : ''}`}
                        disabled={isGenerating}
                    >
                        <FontAwesomeIcon icon={faRotate} className={isGenerating ? 'rotating' : ''} />
                        Generar Desayuno
                    </button>
                    {breakfastMenu.length > 0 && !isGenerating && (
                        <>
                            <div className="menu-description">
                                {breakfastMenu.map((product, index) => {
                                    if (product.type === 'carbohydrate') {
                                        return <span key={index}>{goal === 'perder' ? '20' : '30'}gr de {product.name}</span>;
                                    }
                                    if (product.type === 'protein') {
                                        return <span key={index}>{goal === 'perder' ? '100' : '240'}gr de {product.name}</span>;
                                    }
                                    if (product.type === 'vegetable') {
                                        return <span key={index}>{product.name}</span>;
                                    }
                                    return null;
                                }).filter(Boolean).map((item, index, array) => (
                                    <span key={`separator-${index}`} className='menu-description-item'>
                                        {item}
                                        {index < array.length - 1 && ' + '}
                                    </span>
                                ))}
                            </div>
                            <div className="calories-info">
                                Número de calorías de este desayuno:{' '}
                                <span className="calories-number">
                                    {Math.round(breakfastMenu.reduce((total, product) => {
                                        const multiplier =
                                            product.type === 'carbohydrate' ? 0.2 :
                                                product.type === 'protein' ? (goal === 'perder' ? 1 : 2.4) :
                                                    product.type === 'vegetable' ? 1.8 : 0;
                                        return total + (product.nutrition.energia * multiplier);
                                    }, 0))} kcal
                                </span>
                            </div>
                            {breakfastMenu.length > 0 && !isGenerating && (
                                <div className="nutrition-table">
                                    <h4>Tabla nutricional del desayuno</h4>
                                    {getNutritionTable(calculateTotalNutrition())}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MenuComposer; 