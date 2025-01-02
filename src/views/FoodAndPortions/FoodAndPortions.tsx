import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import './FoodAndPortions.css';

interface NutrientItem {
    id: number;
    name: string;
    grams: number;
}

interface NutrientConfig {
    type: string;
    endpoint: string;
}

const nutrientConfigs: NutrientConfig[] = [
    { type: 'proteins', endpoint: 'http://localhost:3001/api/proteins' },
    { type: 'carbohydrates', endpoint: 'http://localhost:3001/api/carbohydrates' },
    { type: 'vegetables', endpoint: 'http://localhost:3001/api/vegetables' },
];

interface NutrientTableProps {
    type: string;
    title: string;
    data: NutrientItem[];
}

const NutrientTable = ({ type, title, data }: NutrientTableProps) => (
    <div className={`${type}-list`}>
        <h3>Available {title}:</h3>
        <div className="nutrients-table">
            <div className="table-header">
                <div className="column name">{title.slice(0, -1)}</div>
                <div className="column grams">Portion Size</div>
            </div>
            {data.map((item) => (
                <div key={item.id} className="table-row">
                    <div className="column name">{item.name}</div>
                    <div className="column grams">{item.grams}g</div>
                </div>
            ))}
        </div>
    </div>
);

const FoodAndPortions = () => {
    const proteins = useFetch<NutrientItem[]>(nutrientConfigs[0].endpoint);
    const carbohydrates = useFetch<NutrientItem[]>(nutrientConfigs[1].endpoint);
    const vegetables = useFetch<NutrientItem[]>(nutrientConfigs[2].endpoint);

    const nutrients = [
        { ...proteins, type: 'proteins' },
        { ...carbohydrates, type: 'carbohydrates' },
        { ...vegetables, type: 'vegetables' }
    ];

    if (nutrients.some(n => n.loading)) return <div>Loading...</div>;
    if (nutrients.some(n => n.error)) return <div>Error loading data</div>;
    if (nutrients.some(n => !n.data)) return null;

    return (
        <div className="food-and-portions">
            <h1 className="food-and-portions-title">Food & Portions</h1>
            <div className="nutrients-section">
                {nutrients.map(nutrient => (
                    <NutrientTable
                        key={nutrient.type}
                        type={nutrient.type}
                        title={nutrient.type.charAt(0).toUpperCase() + nutrient.type.slice(1)}
                        data={nutrient.data || []}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodAndPortions; 