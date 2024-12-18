interface EmojiDictionary {
    [key: string]: string;
}

// Constants
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

const initialMessage = "Dale al botón para ver que desayunas hoy...";
let animationInterval: number | null = null;

// Helper Functions
function getRandomWord(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

function generatePhrase(arrays: string[][]): string {
    return arrays.map(array => getRandomWord(array)).join(' ');
}

function generateTextPhrase(emojiPhrase: string): string {
    const words = emojiPhrase.split(' ').map(emoji => emojiToText[emoji]);
    if (words.length > 1) {
        return words.slice(0, -1).join(', ') + ' y ' + words[words.length - 1];
    }
    return words[0];
}

function resetDisplay(): void {
    const phraseDisplay = document.getElementById('phrase-display');
    const generatedWords = document.getElementById('generated-words');
    const resetBtn = document.getElementById('reset-btn');
    const textWords = document.getElementById('text-words');

    if (phraseDisplay) {
        phraseDisplay.textContent = initialMessage;
    }
    if (generatedWords) {
        generatedWords.textContent = '';
        generatedWords.classList.add('hidden');
    }
    if (textWords) {
        textWords.remove();
    }
    if (resetBtn) {
        resetBtn.classList.add('hidden');
    }
}

function animateWords(): void {
    const generatedWords = document.getElementById('generated-words');
    const resetBtn = document.getElementById('reset-btn');

    if (!generatedWords) return;

    generatedWords.classList.remove('hidden');
    generatedWords.classList.add('animating');

    animationInterval = window.setInterval(() => {
        if (generatedWords) {
            generatedWords.textContent = generatePhrase([protein, carbohydrates, fruits]);
        }
    }, 100);

    setTimeout(() => {
        if (animationInterval) {
            clearInterval(animationInterval);
        }
        if (generatedWords) {
            const finalPhrase = generatePhrase([protein, carbohydrates, fruits]);
            generatedWords.textContent = finalPhrase;
            generatedWords.classList.remove('animating');

            let textWords = document.getElementById('text-words');
            if (!textWords) {
                textWords = document.createElement('div');
                textWords.id = 'text-words';
                generatedWords.after(textWords);
            }
            textWords.textContent = generateTextPhrase(finalPhrase);
        }
        if (resetBtn) {
            resetBtn.classList.remove('hidden');
        }
    }, 2000);
}

function handleGenerate(): void {
    const phraseDisplay = document.getElementById('phrase-display');
    const generateBtn = document.getElementById('generate-btn');

    if (phraseDisplay && generateBtn) {
        phraseDisplay.textContent = 'Ohhhhhh rico rico';
        generateBtn.setAttribute('disabled', 'true');
        animateWords();
        setTimeout(() => {
            generateBtn.removeAttribute('disabled');
        }, 2000);
    }
}

// Initialize
function initialize(): void {
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetDisplay);
    }
    resetDisplay();
}

// Start the application when DOM is loaded
window.addEventListener('DOMContentLoaded', initialize); 