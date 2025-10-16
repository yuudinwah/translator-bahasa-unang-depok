import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TranslatorCard from './components/TranslatorCard';
import { translateToUnangText, reverseTranslateText } from './services/translatorService';

const App: React.FC = () => {
    const [direction, setDirection] = useState<'toUnang' | 'fromUnang'>('toUnang');
    const [sourceText, setSourceText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');

    const performTranslation = useCallback((text: string, currentDirection: 'toUnang' | 'fromUnang') => {
        if (text.trim() === '') {
            setTranslatedText('');
            return;
        }
        
        const result = currentDirection === 'toUnang' 
            ? translateToUnangText(text)
            : reverseTranslateText(text);
        
        setTranslatedText(result);
    }, []);

    useEffect(() => {
        // Debounce input to avoid translating on every keystroke
        const handler = setTimeout(() => {
            performTranslation(sourceText, direction);
        }, 250);

        return () => {
            clearTimeout(handler);
        };
    }, [sourceText, direction, performTranslation]);
    
    const handleInputChange = (text: string) => {
        setSourceText(text);
    };

    const handleClear = () => {
        setSourceText('');
        setTranslatedText('');
    };

    const handleSwap = () => {
        // Swap the texts
        const newSourceText = translatedText;
        const newTranslatedText = sourceText;

        // Update the state
        setSourceText(newSourceText);
        setTranslatedText(newTranslatedText);
        setDirection(prev => prev === 'toUnang' ? 'fromUnang' : 'toUnang');
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <main className="w-full">
                <Header />
                <TranslatorCard
                    direction={direction}
                    sourceText={sourceText}
                    translatedText={translatedText}
                    onInputChange={handleInputChange}
                    onClear={handleClear}
                    onSwap={handleSwap}
                />
            </main>
            <footer className="text-center mt-8 text-slate-500 text-sm">
                <p>Dibuat dengan ❤️ untuk warga Depok & sekitarnya.</p>
            </footer>
        </div>
    );
};

export default App;
