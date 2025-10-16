// This service contains the core logic for translating between Indonesian and Bahasa Unang Depok.

const VOWELS = 'aeiou';

const translateToUnangWord = (word: string): string => {
    // Preserve original for return if untranslatable
    const originalWord = word;
    const lowerWord = word.toLowerCase();

    if (lowerWord.trim().length < 1) return originalWord;

    const endsWithNya = lowerWord.endsWith('nya');
    const wordToProcess = endsWithNya ? lowerWord.slice(0, -3) : lowerWord;

    if (!wordToProcess) return originalWord; // e.g. input was just "nya"

    let lastVowelIndex = -1;
    for (let i = wordToProcess.length - 1; i >= 0; i--) {
        if (VOWELS.includes(wordToProcess[i])) {
            lastVowelIndex = i;
            break;
        }
    }

    if (lastVowelIndex === -1) return originalWord; // No vowels, can't translate

    // Determine the start of the basic last syllable (e.g., "cur" in "hancur")
    let lastSyllableStartIndex = lastVowelIndex;
    if (lastSyllableStartIndex > 0 && !VOWELS.includes(wordToProcess[lastSyllableStartIndex - 1])) {
        lastSyllableStartIndex--;
    }

    // Rule 1: "Konsonan Pindah". If syllable before last ends in a consonant, it moves.
    // (e.g. "han" in "hancur", "n" moves).
    let partForXStartIndex = lastSyllableStartIndex;
    if (partForXStartIndex > 0 && !VOWELS.includes(wordToProcess[partForXStartIndex - 1])) {
        partForXStartIndex--;
    }

    const partForX = wordToProcess.substring(partForXStartIndex);
    const b = wordToProcess.substring(0, partForXStartIndex);
    
    const vowelsInPartForX = partForX.match(/[aeiou]/g);
    if (!vowelsInPartForX) return originalWord;

    const c = vowelsInPartForX[vowelsInPartForX.length - 1];
    const x = partForX.replace(/[aeiou]/g, 'a');

    // Format: U(x) (b)n(c)ng
    const firstPart = `U${x}`;
    let secondPart = `${b}n${c}ng`;
    
    // Rule 3: Handle "nya" suffix
    if (endsWithNya) {
        secondPart += 'nya';
    }

    // Rule 2 (one-syllable words) is handled implicitly, as `b` will be empty.
    
    return `${firstPart.charAt(0).toUpperCase()}${firstPart.slice(1)} ${secondPart}`;
};


const translateFromUnangPair = (word1: string, word2: string): string => {
    // word1 is U(x), word2 is (b)n(c)ng or (b)n(c)ngnya
    const BNC_REGEX = /^(.*)n([aeiou])ng(nya)?$/i;
    
    const x_part = word1.substring(1).toLowerCase(); // remove U
    const bnc_match = word2.match(BNC_REGEX);

    if (!bnc_match) {
        return `${word1} ${word2}`; 
    }

    const [, b_part, c_part, nya_part] = bnc_match;

    const originalLastSyllable = x_part.replace(/a/g, c_part.toLowerCase());

    let result = `${b_part}${originalLastSyllable}`;

    if (nya_part) {
        result += nya_part;
    }

    return result;
};

const processText = (text: string, translatorFunc: (word: string) => string): string => {
    // Split by spaces and punctuation, keeping the delimiters
    const segments = text.split(/([\s.,;!?]+)/); 
    
    return segments.map(segment => {
        // Don't translate delimiters
        if (/^[\s.,;!?]+$/.test(segment) || segment === '') return segment;
        return translatorFunc(segment);
    }).join('');
}

export const translateToUnangText = (text: string): string => {
    return processText(text, translateToUnangWord);
};

export const reverseTranslateText = (text: string): string => {
    const segments = text.split(/([\s.,;!?]+)/);
    let result = [];
    let i = 0;

    while (i < segments.length) {
        const segment1 = segments[i];

        // If it's a delimiter or empty, just add it and continue
        if (/^[\s.,;!?]+$/.test(segment1) || segment1 === '') {
            result.push(segment1);
            i++;
            continue;
        }

        // It's a word. Let's find the next word, skipping over delimiters.
        let spaceDelimiter = '';
        let nextWordIndex = -1;
        for (let j = i + 1; j < segments.length; j++) {
            if (/^[\s.,;!?]+$/.test(segments[j])) {
                spaceDelimiter += segments[j];
            } else if (segments[j] !== '') {
                nextWordIndex = j;
                break;
            }
        }
        
        const segment2 = nextWordIndex !== -1 ? segments[nextWordIndex] : null;
        
        // Check if the pair matches the Unang pattern.
        if (segment1.toLowerCase().startsWith('u') && segment2 && /n[aeiou]ng(nya)?$/i.test(segment2) && spaceDelimiter.includes(' ')) {
            result.push(translateFromUnangPair(segment1, segment2));
            i = nextWordIndex + 1; // Jump index past the second word
        } else {
            // Not a translatable pair, just add the first segment
            result.push(segment1);
            i++;
        }
    }
    
    return result.join('');
};