import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
    className?: string;
}

const Button = ({ onClick, text, className }: ButtonProps) => {
    const isReset = text.toLowerCase() === 'reset';

    return (
        <button className={className} onClick={onClick}>
            {isReset && <FontAwesomeIcon icon={faEraser} className="button-icon" />}
            {text}
        </button>
    );
};

export default Button; 