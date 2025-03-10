import React, { useState, useCallback } from 'react';
import './MenuGenerator.css';
import {
    protein,
    carbohydrates,
    fruits,
    generatePhrase,
    generateTextPhrase
} from '../../helpers/menuGeneratorHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const MenuGenerator = () => {
    const [phrase, setPhrase] = useState<string>("Dale al botón para ver que comes hoy...");
    const [generatedWords, setGeneratedWords] = useState<string>("");
    const [textWords, setTextWords] = useState<string>("");
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [showReset, setShowReset] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const resetDisplay = useCallback(() => {
        setPhrase("Dale al botón para ver que comes hoy...");
        setGeneratedWords("");
        setTextWords("");
        setShowReset(false);
        setIsAnimating(false);
    }, []);

    const handleGenerate = useCallback(() => {
        if (isGenerating) return;

        setIsGenerating(true);
        setPhrase("Ohhhhhh rico rico");
        setIsAnimating(true);
        setShowReset(false);

        const animationInterval = setInterval(() => {
            setGeneratedWords(generatePhrase([protein, carbohydrates, fruits]));
        }, 100);

        setTimeout(() => {
            clearInterval(animationInterval);
            const finalPhrase = generatePhrase([protein, carbohydrates, fruits]);
            setGeneratedWords(finalPhrase);
            setTextWords(generateTextPhrase(finalPhrase));
            setIsAnimating(false);
            setShowReset(true);
            setIsGenerating(false);
        }, 2000);
    }, [isGenerating]);

    return (
        <div className="menu-generator-container">
            <span className="title">Genera tu menú</span>
            <div className="phrase-display">{phrase}</div>
            <div className={`generated-words ${isAnimating ? 'animating' : ''} ${!generatedWords ? 'hidden' : ''}`}>
                {generatedWords}
            </div>
            {textWords && <div className="text-words">{textWords}</div>}
            <div className="button-container">
                <button
                    className="generate-btn"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                >
                    a comeeeeer
                </button>
            </div>
            {showReset && (
                <Button
                    className="reset-btn"
                    onClick={resetDisplay}
                    text="Reset"
                    icon={<FontAwesomeIcon icon={faEraser} />}
                />
            )}
        </div>
    );
};

export default MenuGenerator; 