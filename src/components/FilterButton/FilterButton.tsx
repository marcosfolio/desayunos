import React from 'react';
import './FilterButton.css';

interface FilterButtonProps {
    type: string;
    selectedType: string;
    onClick: (type: string) => void;
    children: React.ReactNode;
}

const FilterButton = ({ type, selectedType, onClick, children }: FilterButtonProps) => {
    return (
        <button
            className={`filter-button ${selectedType === type ? 'active' : ''}`}
            onClick={() => onClick(type)}
        >
            {children}
        </button>
    );
};

export default FilterButton; 