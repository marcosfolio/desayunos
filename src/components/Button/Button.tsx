import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
    disabled?: boolean;
    icon?: ReactNode;
    className?: string;
}

const Button = ({
    onClick,
    text,
    disabled = false,
    icon,
    className = ''
}: ButtonProps) => {
    return (
        <button
            className={`button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
            {icon && <span className="button-icon">{icon}</span>}
        </button>
    );
};

export default Button; 