interface EmojiDictionary {
    [key: string]: string;
}

class BreakfastGenerator {
    private protein: string[] = ['🍳', '🐟', '🧀', '🦃', '🐓'];
    private carbohydrates: string[] = ['🍞', '🍚', '🍝', '🌾', '🍞'];
    private fruits: string[] = ['🥝', '🍓', '🍐', '🍏', '🍍'];

    private emojiToText: EmojiDictionary = {
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

    private phraseDisplay: HTMLElement | null;
    private generatedWords: HTMLElement | null;
    private generateBtn: HTMLElement | null;
    private resetBtn: HTMLElement | null;
    private initialMessage: string = "Dale al botón para ver que desayunas hoy...";
    private animationInterval: number | null = null;

    constructor() {
        this.phraseDisplay = document.getElementById('phrase-display');
        this.generatedWords = document.getElementById('generated-words');
        this.generateBtn = document.getElementById('generate-btn');
        this.resetBtn = document.getElementById('reset-btn');

        this.initialize();
    }

    private initialize(): void {
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => this.handleGenerate());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetDisplay());
        }
        this.resetDisplay();
    }

    private getRandomWord(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    private generatePhrase(arrays: string[][]): string {
        return arrays.map(array => this.getRandomWord(array)).join(' ');
    }

    private generateTextPhrase(emojiPhrase: string): string {
        const words = emojiPhrase.split(' ').map(emoji => this.emojiToText[emoji]);
        if (words.length > 1) {
            return words.slice(0, -1).join(', ') + ' y ' + words[words.length - 1];
        }
        return words[0];
    }

    private resetDisplay(): void {
        if (this.phraseDisplay) {
            this.phraseDisplay.textContent = this.initialMessage;
        }
        if (this.generatedWords) {
            this.generatedWords.textContent = '';
            this.generatedWords.classList.add('hidden');
        }
        const textWords = document.getElementById('text-words');
        if (textWords) textWords.remove();
        if (this.resetBtn) {
            this.resetBtn.classList.add('hidden');
        }
    }

    private animateWords(): void {
        if (!this.generatedWords) return;

        this.generatedWords.classList.remove('hidden');
        this.generatedWords.classList.add('animating');

        this.animationInterval = window.setInterval(() => {
            if (this.generatedWords) {
                this.generatedWords.textContent = this.generatePhrase([this.protein, this.carbohydrates, this.fruits]);
            }
        }, 100);

        setTimeout(() => {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
            }
            if (this.generatedWords) {
                const finalPhrase = this.generatePhrase([this.protein, this.carbohydrates, this.fruits]);
                this.generatedWords.textContent = finalPhrase;
                this.generatedWords.classList.remove('animating');

                let textWords = document.getElementById('text-words');
                if (!textWords) {
                    textWords = document.createElement('div');
                    textWords.id = 'text-words';
                    this.generatedWords.after(textWords);
                }
                textWords.textContent = this.generateTextPhrase(finalPhrase);
            }
            if (this.resetBtn) {
                this.resetBtn.classList.remove('hidden');
            }
        }, 2000);
    }

    private handleGenerate(): void {
        if (this.phraseDisplay && this.generateBtn) {
            this.phraseDisplay.textContent = 'Ohhhhhh rico rico';
            this.generateBtn.setAttribute('disabled', 'true');
            this.animateWords();
            setTimeout(() => {
                this.generateBtn?.removeAttribute('disabled');
            }, 2000);
        }
    }
}

// Initialize the application when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    new BreakfastGenerator();
}); 