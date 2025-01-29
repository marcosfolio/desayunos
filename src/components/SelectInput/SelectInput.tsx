import React from 'react';
import './SelectInput.css';

interface SelectInputProps {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    value,
    onChange,
    options,
    className = '',
}) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`select-input ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
