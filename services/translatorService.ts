
// This regex is designed to find the last syllable of an Indonesian word.
// It looks for an optional consonant, one or more vowels, and zero or more consonants at the end of a string.
const SYLLABLE_REGEX = /[bcdfghjklmnpqrstvwxyz]?[aeiou]+[bcdfghjklmnpqrstvwxyz]*$/i;

const translateWord = (word: string): string => {
    // Ignore short or empty words
    if (word.trim().length < 2) {
        return word;
    }
    
    const lastSyllableMatch = word.match(SYLLABLE_REGEX);

    // If no syllable with a vowel is found, return the original word
    if (!lastSyllableMatch) {
        return word;
    }

    const lastSyllable = lastSyllableMatch[0];
    // 'b' is the part of the word before the last syllable
    const b = word.substring(0, word.length - lastSyllable.length);

    const vowelsInSyllable = lastSyllable.match(/[aeiou]/ig);
    // This is a safeguard; the regex should ensure there's at least one vowel
    if (!vowelsInSyllable) {
        return word;
    }
    // 'c' is the last vowel of the original last syllable
    const c = vowelsInSyllable[vowelsInSyllable.length - 1];

    // 'x' is the last syllable with all its vowels replaced by 'a'
    const x = lastSyllable.replace(/[aeiou]/ig, 'a');

    // Assemble the final word based on the formula: U(x)(b)n(c)ng
    return `U${x.toLowerCase()}${b.toLowerCase()}n${c.toLowerCase()}ng`;
};

export const translateText = (text: string): string => {
    // Split the text by whitespace while preserving it, to maintain formatting like newlines
    const segments = text.split(/(\s+)/); 
    
    return segments.map(segment => {
        // If the segment is just whitespace or empty, return it as is
        if (/^\s*$/.test(segment)) {
            return segment;
        }
        return translateWord(segment);
    }).join('');
};
