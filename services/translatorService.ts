// This service contains the core logic for translating between Indonesian and Bahasa Unang Depok.

const translateToUnangWord = (word: string): string => {
    if (word.trim().length < 2) return word;

    const vowels = 'aeiouAEIOU';
    let lastVowelIndex = -1;
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i])) {
            lastVowelIndex = i;
            break;
        }
    }

    // If no vowels, can't translate
    if (lastVowelIndex === -1) return word;

    let syllableStartIndex = lastVowelIndex;
    if (lastVowelIndex > 0 && !vowels.includes(word[lastVowelIndex - 1])) {
        syllableStartIndex = lastVowelIndex - 1;
    }
    
    const lastSyllable = word.substring(syllableStartIndex);
    const b = word.substring(0, syllableStartIndex);

    const vowelsInSyllable = lastSyllable.match(/[aeiou]/ig);
    if (!vowelsInSyllable) return word;

    const c = vowelsInSyllable[vowelsInSyllable.length - 1];
    const x = lastSyllable.replace(/[aeiou]/ig, 'a');

    // New format with space: U(x) (b)n(c)ng
    return `U${x.toLowerCase()} ${b.toLowerCase()}n${c.toLowerCase()}ng`;
};

const translateFromUnangPair = (word1: string, word2: string): string => {
    // word1 is U(x), word2 is (b)n(c)ng
    const BNC_REGEX = /^(.*)n([aeiou])ng$/i;
    
    const x_part = word1.substring(1).toLowerCase(); // remove U
    const bnc_match = word2.match(BNC_REGEX);

    if (!bnc_match) {
        return `${word1} ${word2}`; 
    }

    const [, b_part, c_part] = bnc_match;

    // Recreate the original last syllable by replacing 'a's with the captured vowel 'c'
    const originalLastSyllable = x_part.replace(/a/g, c_part.toLowerCase());

    return `${b_part}${originalLastSyllable}`;
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
            } else {
                nextWordIndex = j;
                break;
            }
        }
        
        const segment2 = nextWordIndex !== -1 ? segments[nextWordIndex] : null;
        
        // Check if the pair matches the Unang pattern. A space in between is required.
        if (segment1.toLowerCase().startsWith('u') && segment2 && /n[aeiou]ng$/i.test(segment2) && spaceDelimiter.includes(' ')) {
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
