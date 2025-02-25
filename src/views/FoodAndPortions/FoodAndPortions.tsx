import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import './FoodAndPortions.css';

interface NutrientItem {
    id: string;
    name: string;
    type: 'protein' | 'carbohydrate' | 'vegetable';
    nutrition: {
        proteinas: number;
        // ... other nutrition fields
    };
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
    const [products, setProducts] = useState<NutrientItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'products'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as NutrientItem[];
                setProducts(productsData);
            } catch (err) {
                setError('Error loading products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const groupedProducts = {
        proteins: products.filter(p => p.type === 'protein'),
        carbohydrates: products.filter(p => p.type === 'carbohydrate'),
        vegetables: products.filter(p => p.type === 'vegetable')
    };

    return (
        <div className="food-and-portions">
            <h1 className="food-and-portions-title">Food & Portions</h1>
            <div className="nutrients-section">
                {Object.entries(groupedProducts).map(([type, items]) => (
                    <NutrientTable
                        key={type}
                        type={type}
                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                        data={items}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodAndPortions; 