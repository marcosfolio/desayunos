import React from 'react';
import './SelectInput.css';

interface FoodItem {
    id: number;
    name: string;
    grams: number;
}

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FoodItem[];
    isLoading: boolean;
    error: any;
    placeholder: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    value,
    onChange,
    options,
    isLoading,
    error,
    placeholder
}) => (
    <div className="select-group">
        <label>{label}</label>
        {isLoading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error loading {label.toLowerCase()}</p>
        ) : (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options?.map(option => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        )}
    </div>
);

export default SelectInput; 