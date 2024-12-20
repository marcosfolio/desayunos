interface EmojiDictionary {
    [key: string]: string;
}

// Constants
export const protein: string[] = ['🍳', '🐟', '🧀', '🦃', '🐓'];
export const carbohydrates: string[] = ['🍞', '🍚', '🍝', '🌾', '🍞'];
export const fruits: string[] = ['🥝', '🍓', '🍐', '🍏', '🍍'];

export const emojiToText: EmojiDictionary = {
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

export const getRandomWord = (array: string[]): string => {
    return array[Math.floor(Math.random() * array.length)];
};

export const generatePhrase = (arrays: string[][]): string => {
    return arrays.map(array => getRandomWord(array)).join(' ');
};

export const generateTextPhrase = (emojiPhrase: string): string => {
    const words = emojiPhrase.split(' ').map(emoji => emojiToText[emoji]);
    if (words.length > 1) {
        return words.slice(0, -1).join(', ') + ' y ' + words[words.length - 1];
    }
    return words[0];
}; 