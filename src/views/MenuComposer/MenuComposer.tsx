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
    const [dinnerMenu, setDinnerMenu] = useState<typeof products>([]);
    const [lunchMenu, setLunchMenu] = useState<typeof products>([]);
    const [snackMenu, setSnackMenu] = useState<typeof products>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingDinner, setIsGeneratingDinner] = useState(false);
    const [isGeneratingLunch, setIsGeneratingLunch] = useState(false);
    const [isGeneratingSnack, setIsGeneratingSnack] = useState(false);
    const [goal, setGoal] = useState<Goal>('perder');

    useEffect(() => {
        generateInitialBreakfast();
        generateInitialSnack();
        generateInitialLunch();
        generateInitialDinner();
    }, []);

    useEffect(() => {
        // Regenerate all menus when goal changes
        generateInitialBreakfast();
        generateInitialSnack();
        generateInitialLunch();
        generateInitialDinner();
    }, [goal]); // Add goal as dependency

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

    const generateInitialDinner = () => {
        const initialMenu = generateDinnerItems();
        setDinnerMenu(initialMenu);
    };

    const generateDinnerItems = () => {
        const proteins = products.filter(product =>
            product.type === 'protein' &&
            product.typeOfMeal.includes('cena')
        );
        const vegetables = products.filter(product =>
            product.type === 'vegetable' &&
            product.typeOfMeal.includes('cena')
        );

        const randomProtein = proteins[Math.floor(Math.random() * proteins.length)];
        const randomVegetable = vegetables[Math.floor(Math.random() * vegetables.length)];

        return [randomProtein, randomVegetable].filter(Boolean);
    };

    const generateDinner = () => {
        setIsGeneratingDinner(true);

        const animationInterval = setInterval(() => {
            setDinnerMenu(generateDinnerItems());
        }, 100);

        setTimeout(() => {
            clearInterval(animationInterval);
            setDinnerMenu(generateDinnerItems());
            setIsGeneratingDinner(false);
        }, 1000);
    };

    const generateInitialLunch = () => {
        const initialMenu = generateLunchItems();
        setLunchMenu(initialMenu);
    };

    const generateLunchItems = () => {
        const proteins = products.filter(product =>
            product.type === 'protein' &&
            product.typeOfMeal.includes('comida')
        );
        const vegetables = products.filter(product =>
            product.type === 'vegetable' &&
            product.typeOfMeal.includes('comida')
        );
        const carbs = products.filter(product =>
            product.type === 'carbohydrate' &&
            product.typeOfMeal.includes('comida')
        );

        const randomProtein = proteins[Math.floor(Math.random() * proteins.length)];
        const randomVegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
        const randomCarb = goal === 'energia' ? carbs[Math.floor(Math.random() * carbs.length)] : null;

        // Return carbs first when goal is energia, otherwise protein first
        return goal === 'energia'
            ? [randomCarb, randomProtein, randomVegetable].filter(Boolean)
            : [randomProtein, randomVegetable].filter(Boolean);
    };

    const generateLunch = () => {
        setIsGeneratingLunch(true);

        const animationInterval = setInterval(() => {
            setLunchMenu(generateLunchItems());
        }, 100);

        setTimeout(() => {
            clearInterval(animationInterval);
            setLunchMenu(generateLunchItems());
            setIsGeneratingLunch(false);
        }, 1000);
    };

    const generateInitialSnack = () => {
        const initialMenu = generateSnackItems();
        setSnackMenu(initialMenu);
    };

    const generateSnackItems = () => {
        if (goal === 'perder') {
            // For weight loss, only show vegetables
            const vegetables = products.filter(product =>
                product.type === 'vegetable' &&
                product.typeOfMeal.includes('almuerzo')
            );
            const randomVegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
            return [randomVegetable].filter(Boolean);
        } else {
            // For energy gain, show one carb and one protein
            const carbs = products.filter(product =>
                product.type === 'carbohydrate' &&
                product.typeOfMeal.includes('almuerzo')
            );
            const proteins = products.filter(product =>
                product.type === 'protein' &&
                product.typeOfMeal.includes('almuerzo')
            );

            const randomCarb = carbs[Math.floor(Math.random() * carbs.length)];
            const randomProtein = proteins[Math.floor(Math.random() * proteins.length)];
            return [randomCarb, randomProtein].filter(Boolean);
        }
    };

    const generateSnack = () => {
        setIsGeneratingSnack(true);

        const animationInterval = setInterval(() => {
            setSnackMenu(generateSnackItems());
        }, 100);

        setTimeout(() => {
            clearInterval(animationInterval);
            setSnackMenu(generateSnackItems());
            setIsGeneratingSnack(false);
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

    const calculateDinnerNutrition = () => {
        return dinnerMenu.reduce((total, product) => {
            const multiplier =
                product.type === 'protein' ? (goal === 'perder' ? 1.25 : 1.8) :
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

    const calculateLunchNutrition = () => {
        return lunchMenu.reduce((total, product) => {
            const multiplier =
                product.type === 'protein' ? (goal === 'perder' ? 1.25 : 1.8) :
                    product.type === 'carbohydrate' ? (goal === 'perder' ? 0.6 : 0.8) :
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

    const calculateTotalDayNutrition = () => {
        const breakfast = calculateTotalNutrition();
        const lunch = calculateLunchNutrition();
        const dinner = calculateDinnerNutrition();

        return {
            energia: breakfast.energia + lunch.energia + dinner.energia,
            grasas: breakfast.grasas + lunch.grasas + dinner.grasas,
            grasasSaturadas: breakfast.grasasSaturadas + lunch.grasasSaturadas + dinner.grasasSaturadas,
            grasasInsaturadas: breakfast.grasasInsaturadas + lunch.grasasInsaturadas + dinner.grasasInsaturadas,
            hidratosCarbono: breakfast.hidratosCarbono + lunch.hidratosCarbono + dinner.hidratosCarbono,
            azucares: breakfast.azucares + lunch.azucares + dinner.azucares,
            proteinas: breakfast.proteinas + lunch.proteinas + dinner.proteinas,
        };
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
            <section className="menu-section">
                <h1>Desayuno</h1>
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
                <div className="button-container"><button
                    onClick={generateBreakfast}
                    className={`generate-button ${isGenerating ? 'generating' : ''}`}
                    disabled={isGenerating}
                >
                    <FontAwesomeIcon icon={faRotate} className={isGenerating ? 'rotating' : ''} />
                    Generar Desayuno
                </button></div>
                <div className="menu-container">
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

            <section className="menu-section">
                <h1>Almuerzo</h1>
                <div className="product-grid">
                    {snackMenu.map((product, index) => (
                        <div key={index} className={`product-card ${isGeneratingSnack ? 'generating' : ''}`}>
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
                        onClick={generateSnack}
                        className={`generate-button ${isGeneratingSnack ? 'generating' : ''}`}
                        disabled={isGeneratingSnack}
                    >
                        <FontAwesomeIcon icon={faRotate} className={isGeneratingSnack ? 'rotating' : ''} />
                        Generar Almuerzo
                    </button>
                </div>
                <div className="menu-container">
                    {snackMenu.length > 0 && !isGeneratingSnack && (
                        <>
                            <div className="menu-description">
                                {snackMenu.map((product, index) => (
                                    <span key={index} className='menu-description-item'>
                                        {product.type === 'carbohydrate' ? `20gr de ${product.name}` :
                                            product.type === 'protein' ? `30gr de ${product.name}` :
                                                product.name}
                                        {index < snackMenu.length - 1 && ' + '}
                                    </span>
                                ))}
                            </div>
                            <div className="calories-info">
                                Número de calorías de este almuerzo:{' '}
                                <span className="calories-number">
                                    {Math.round(snackMenu.reduce((total, product) => {
                                        const multiplier =
                                            product.type === 'carbohydrate' ? 0.2 :
                                                product.type === 'protein' ? 0.3 :
                                                    product.type === 'vegetable' ? 1 : 0;
                                        return total + (product.nutrition.energia * multiplier);
                                    }, 0))} kcal
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="menu-section">
                <h1>Comida</h1>
                <div className="product-grid">
                    {lunchMenu.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
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
                        onClick={generateLunch}
                        className={`generate-button ${isGeneratingLunch ? 'generating' : ''}`}
                        disabled={isGeneratingLunch}
                    >
                        <FontAwesomeIcon icon={faRotate} className={isGeneratingLunch ? 'rotating' : ''} />
                        Generar Comida
                    </button>
                </div>
                <div className="menu-container">
                    {lunchMenu.length > 0 && !isGeneratingLunch && (
                        <>
                            <div className="menu-description">
                                {lunchMenu.map((product, index) => {
                                    if (product.type === 'protein') {
                                        return <span key={index}>{goal === 'perder' ? '125' : '180'}gr de {product.name}</span>;
                                    }
                                    if (product.type === 'carbohydrate') {
                                        return <span key={index}>{goal === 'perder' ? '60' : '80'}gr de {product.name}</span>;
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
                                Número de calorías de esta comida:{' '}
                                <span className="calories-number">
                                    {Math.round(lunchMenu.reduce((total, product) => {
                                        const multiplier =
                                            product.type === 'protein' ? (goal === 'perder' ? 1.25 : 1.8) :
                                                product.type === 'carbohydrate' ? (goal === 'perder' ? 0.6 : 0.8) :
                                                    product.type === 'vegetable' ? 1.8 : 0;
                                        return total + (product.nutrition.energia * multiplier);
                                    }, 0))} kcal
                                </span>
                            </div>
                            <div className="nutrition-table">
                                <h4>Tabla nutricional de la comida</h4>
                                {getNutritionTable(calculateLunchNutrition())}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="menu-section">
                <h1>Cena</h1>
                <div className="product-grid">
                    {dinnerMenu.map((product, index) => (
                        <div key={index} className={`product-card ${isGeneratingDinner ? 'generating' : ''}`}>
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
                        onClick={generateDinner}
                        className={`generate-button ${isGeneratingDinner ? 'generating' : ''}`}
                        disabled={isGeneratingDinner}
                    >
                        <FontAwesomeIcon icon={faRotate} className={isGeneratingDinner ? 'rotating' : ''} />
                        Generar Cena
                    </button>
                </div>
                <div className="menu-container">
                    {dinnerMenu.length > 0 && !isGeneratingDinner && (
                        <>
                            <div className="menu-description">
                                {dinnerMenu.map((product, index) => {
                                    if (product.type === 'protein') {
                                        return <span key={index}>{goal === 'perder' ? '125' : '180'}gr de {product.name}</span>;
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
                                Número de calorías de esta cena:{' '}
                                <span className="calories-number">
                                    {Math.round(dinnerMenu.reduce((total, product) => {
                                        const multiplier =
                                            product.type === 'protein' ? (goal === 'perder' ? 1.25 : 1.8) :
                                                product.type === 'vegetable' ? 1.8 : 0;
                                        return total + (product.nutrition.energia * multiplier);
                                    }, 0))} kcal
                                </span>
                            </div>
                            <div className="nutrition-table">
                                <h4>Tabla nutricional de la cena</h4>
                                {getNutritionTable(calculateDinnerNutrition())}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {breakfastMenu.length > 0 && lunchMenu.length > 0 && dinnerMenu.length > 0 && !isGenerating && !isGeneratingLunch && !isGeneratingDinner && (
                <section className="menu-section">
                    <h1>Total Nutricional del Día</h1>
                    <div className="menu-container">
                        <div className="calories-info">
                            Calorías totales del día:{' '}
                            <span className="calories-number">
                                {Math.round(calculateTotalDayNutrition().energia)} kcal
                            </span>
                        </div>
                        <div className="nutrition-table">
                            <h4>Tabla nutricional total del día</h4>
                            {getNutritionTable(calculateTotalDayNutrition())}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MenuComposer; 