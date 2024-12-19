import React, { useState, useEffect, useCallback } from 'react';
import './BreakfastGenerator.css';

interface EmojiDictionary {
    [key: string]: string;
}

const protein: string[] = ['🍳', '🐟', '🧀', '🦃', '🐓'];
const carbohydrates: string[] = ['🍞', '🍚', '🍝', '🌾', '🍞'];
const fruits: string[] = ['🥝', '🍓', '🍐', '🍏', '🍍'];

const emojiToText: EmojiDictionary = {
    '🍳': 'tortilla de claras de huevo',
    '🐟': 'lata de atún',
    '🧀': 'queso fresco',
    '🦃': '75gr de pavo',
    '🐓': '75gr de pollo',
    '🍞': 'pan dextrinado',
    '🍚': 'arroz integral',
    '🍝': 'pasta integral',
    '🌾': 'cereales de avena',
    '🥝': 'kiwi',
    '🍓': 'fresa',
    '🍐': 'pera',
    '🍏': 'manzana',
    '🍍': 'piña'
};

const BreakfastGenerator: React.FC = () => {
    const [phrase, setPhrase] = useState<string>("Dale al botón para ver que desayunas hoy...");
    const [generatedWords, setGeneratedWords] = useState<string>("");
    const [textWords, setTextWords] = useState<string>("");
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [showReset, setShowReset] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const getRandomWord = useCallback((array: string[]): string => {
        return array[Math.floor(Math.random() * array.length)];
    }, []);

    const generatePhrase = useCallback((arrays: string[][]): string => {
        return arrays.map(array => getRandomWord(array)).join(' ');
    }, [getRandomWord]);

    const generateTextPhrase = useCallback((emojiPhrase: string): string => {
        const words = emojiPhrase.split(' ').map(emoji => emojiToText[emoji]);
        if (words.length > 1) {
            return words.slice(0, -1).join(', ') + ' y ' + words[words.length - 1];
        }
        return words[0];
    }, []);

    const resetDisplay = useCallback(() => {
        setPhrase("Dale al botón para ver que desayunas hoy...");
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
    }, [generatePhrase, generateTextPhrase, isGenerating]);

    return (
        <div className="container">
            <h1>DESAYUNOS</h1>
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
                    a desayunaaaar
                </button>
            </div>
            {showReset && (
                <button className="reset-btn" onClick={resetDisplay}>
                    Reset
                </button>
            )}
        </div>
    );
};

export default BreakfastGenerator; 