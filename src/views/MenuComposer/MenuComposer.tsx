import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './MenuComposer.css';
import Switch from '../../components/Switch/Switch';

interface FoodItem {
    id: number;
    name: string;
    grams: number;
}

interface Protein extends FoodItem { }
interface Carbohydrate extends FoodItem { }
interface Vegetable extends FoodItem { }

const MenuComposer = () => {
    const { data: proteins, loading: proteinLoading, error: proteinError } =
        useFetch<Protein[]>('http://localhost:3001/api/proteins');
    const { data: carbohydrates, loading: carbLoading, error: carbError } =
        useFetch<Carbohydrate[]>('http://localhost:3001/api/carbohydrates');
    const { data: vegetables, loading: vegLoading, error: vegError } =
        useFetch<Vegetable[]>('http://localhost:3001/api/vegetables');

    const [selectedProtein, setSelectedProtein] = useState('');
    const [selectedCarb, setSelectedCarb] = useState('');
    const [selectedVegetable, setSelectedVegetable] = useState('');
    const [menuPhrase, setMenuPhrase] = useState('');
    const [noCarbs, setNoCarbs] = useState(false);

    const handleGenerateMenu = () => {
        if (selectedProtein && (selectedCarb || noCarbs) && selectedVegetable) {
            const phrase = noCarbs
                ? `${selectedProtein} con ${selectedVegetable}`
                : `${selectedProtein} con ${selectedCarb} y ${selectedVegetable}`;
            setMenuPhrase(phrase);
        }
    };

    return (
        <div className="menu-composer-container">
            <div className="menu-header">
                <h1 className="menu-composer-title">Menu Composer</h1>
                <Switch
                    checked={noCarbs}
                    onChange={(checked) => {
                        setNoCarbs(checked);
                        if (checked) {
                            setSelectedCarb('');
                        }
                    }}
                    label={noCarbs ? 'no carbs menu' : 'menu with carbohydrates'}
                />
            </div>
            <div className="selects-container">
                <div className="select-group">
                    <label>Proteína</label>
                    {proteinLoading ? (
                        <p>Loading...</p>
                    ) : proteinError ? (
                        <p>Error loading proteins</p>
                    ) : (
                        <select
                            value={selectedProtein}
                            onChange={(e) => setSelectedProtein(e.target.value)}
                        >
                            <option value="">Selecciona una proteína</option>
                            {proteins?.map(protein => (
                                <option key={protein.id} value={protein.name}>
                                    {protein.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {!noCarbs && (
                    <div className="select-group">
                        <label>Carbohidrato</label>
                        {carbLoading ? (
                            <p>Loading...</p>
                        ) : carbError ? (
                            <p>Error loading carbohydrates</p>
                        ) : (
                            <select
                                value={selectedCarb}
                                onChange={(e) => setSelectedCarb(e.target.value)}
                            >
                                <option value="">Selecciona un carbohidrato</option>
                                {carbohydrates?.map(carb => (
                                    <option key={carb.id} value={carb.name}>
                                        {carb.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}

                <div className="select-group">
                    <label>Vegetal</label>
                    {vegLoading ? (
                        <p>Loading...</p>
                    ) : vegError ? (
                        <p>Error loading vegetables</p>
                    ) : (
                        <select
                            value={selectedVegetable}
                            onChange={(e) => setSelectedVegetable(e.target.value)}
                        >
                            <option value="">Selecciona un vegetal</option>
                            {vegetables?.map(vegetable => (
                                <option key={vegetable.id} value={vegetable.name}>
                                    {vegetable.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <button
                className="generate-menu-btn"
                onClick={handleGenerateMenu}
                disabled={!selectedProtein || (!noCarbs && !selectedCarb) || !selectedVegetable}
            >
                Menú Comida
            </button>

            {menuPhrase && (
                <div className="menu-phrase">
                    {menuPhrase}
                </div>
            )}
        </div>
    );
};

export default MenuComposer; 