import React from 'react';
import './Switch.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

const Switch = ({ checked, onChange, label }: SwitchProps) => {
    return (
        <div className="switch-container">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={({ target: { checked } }) => onChange(checked)}
                />
                <span className="slider round"></span>
            </label>
            <span className="switch-label">{label}</span>
        </div>
    );
};

export default Switch; 