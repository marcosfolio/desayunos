import React from 'react';
import './Switch.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
    disabled?: boolean;
    'aria-label'?: string;
}

const Switch = ({
    checked,
    onChange,
    label,
    className,
    disabled = false,
    'aria-label': ariaLabel,
}: SwitchProps) => {
    return (
        <div className={`switch-container ${className || ''}`}>
            <label className={`switch ${disabled ? 'disabled' : ''}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={({ target: { checked } }) => !disabled && onChange(checked)}
                    disabled={disabled}
                    aria-label={ariaLabel || label}
                    aria-checked={checked}
                    aria-disabled={disabled}
                    role="checkbox"
                />
                <span className="slider round"></span>
            </label>
            {label && <span className="switch-label">{label}</span>}
        </div>
    );
};

export default Switch; 