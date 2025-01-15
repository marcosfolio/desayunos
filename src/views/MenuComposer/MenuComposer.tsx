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
    const [selectedDinnerProtein, setSelectedDinnerProtein] = useState('');
    const [selectedDinnerCarb, setSelectedDinnerCarb] = useState('');
    const [selectedDinnerVegetable, setSelectedDinnerVegetable] = useState('');
    const [noCarbs, setNoCarbs] = useState(false);
    const [lunchPhrase, setLunchPhrase] = useState('');
    const [dinnerPhrase, setDinnerPhrase] = useState('');

    const handleGenerateLunchMenu = () => {
        if (selectedProtein && (selectedCarb || noCarbs) && selectedVegetable) {
            const phrase = noCarbs
                ? `${selectedProtein} con ${selectedVegetable}`
                : `${selectedProtein} con ${selectedCarb} y ${selectedVegetable}`;
            setLunchPhrase(phrase);
        }
    };

    const handleGenerateDinnerMenu = () => {
        if (selectedDinnerProtein && (selectedDinnerCarb || noCarbs) && selectedDinnerVegetable) {
            const phrase = noCarbs
                ? `${selectedDinnerProtein} con ${selectedDinnerVegetable}`
                : `${selectedDinnerProtein} con ${selectedDinnerCarb} y ${selectedDinnerVegetable}`;
            setDinnerPhrase(phrase);
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
                <h2 className="meal-title">Comida</h2>
                <div className="select-container">
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
                    onClick={handleGenerateLunchMenu}
                    disabled={!selectedProtein || (!noCarbs && !selectedCarb) || !selectedVegetable}
                >
                    Menú Comida
                </button>
            </div>

            <div className="selects-container">
                <h2 className="meal-title">Cena</h2>
                <div className="select-container">
                    <SelectInput
                        label="Proteína"
                        value={selectedDinnerProtein}
                        onChange={setSelectedDinnerProtein}
                        options={proteins || []}
                        isLoading={proteinLoading}
                        error={proteinError}
                        placeholder="Selecciona una proteína"
                    />

                    {!noCarbs && (
                        <SelectInput
                            label="Carbohidrato"
                            value={selectedDinnerCarb}
                            onChange={setSelectedDinnerCarb}
                            options={carbohydrates || []}
                            isLoading={carbLoading}
                            error={carbError}
                            placeholder="Selecciona un carbohidrato"
                        />
                    )}

                    <SelectInput
                        label="Vegetal"
                        value={selectedDinnerVegetable}
                        onChange={setSelectedDinnerVegetable}
                        options={vegetables || []}
                        isLoading={vegLoading}
                        error={vegError}
                        placeholder="Selecciona un vegetal"
                    />
                </div>
                <button
                    className="generate-menu-btn"
                    onClick={handleGenerateDinnerMenu}
                    disabled={!selectedDinnerProtein || (!noCarbs && !selectedDinnerCarb) || !selectedDinnerVegetable}
                >
                    Menú Cena
                </button>
            </div>

            {(lunchPhrase || dinnerPhrase) && (
                <div className="menu-phrases">
                    {lunchPhrase && (
                        <div className="menu-phrase">
                            <h3>Comida:</h3>
                            {lunchPhrase}
                        </div>
                    )}
                    {dinnerPhrase && (
                        <div className="menu-phrase">
                            <h3>Cena:</h3>
                            {dinnerPhrase}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuComposer; 