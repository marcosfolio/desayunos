import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Switch from '../../components/Switch/Switch';
import SelectInput from '../../components/SelectInput/SelectInput';
import './MenuComposer.css';

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
                <SelectInput
                    label="Proteína"
                    value={selectedProtein}
                    onChange={setSelectedProtein}
                    options={proteins || []}
                    isLoading={proteinLoading}
                    error={proteinError}
                    placeholder="Selecciona una proteína"
                />

                {!noCarbs && (
                    <SelectInput
                        label="Carbohidrato"
                        value={selectedCarb}
                        onChange={setSelectedCarb}
                        options={carbohydrates || []}
                        isLoading={carbLoading}
                        error={carbError}
                        placeholder="Selecciona un carbohidrato"
                    />
                )}

                <SelectInput
                    label="Vegetal"
                    value={selectedVegetable}
                    onChange={setSelectedVegetable}
                    options={vegetables || []}
                    isLoading={vegLoading}
                    error={vegError}
                    placeholder="Selecciona un vegetal"
                />
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