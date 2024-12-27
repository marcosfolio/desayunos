import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import './MenuComposer.css';

interface Protein {
    id: number;
    name: string;
    grams: number;
}

const MenuComposer = () => {
    const { data: proteins, loading, error } = useFetch<Protein[]>('http://localhost:3001/api/proteins');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading proteins</div>;
    if (!proteins) return null;

    return (
        <div className="menu-composer">
            <h1>Menu Composer</h1>
            <div className="proteins-list">
                <h3>Available Proteins:</h3>
                <div className="proteins-table">
                    <div className="table-header">
                        <div className="column name">Protein</div>
                        <div className="column grams">Portion Size</div>
                    </div>
                    {proteins.map((protein) => (
                        <div key={protein.id} className="table-row">
                            <div className="column name">{protein.name}</div>
                            <div className="column grams">{protein.grams}g</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuComposer; 