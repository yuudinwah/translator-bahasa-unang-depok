
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TranslatorCard from './components/TranslatorCard';
import { translateText } from './services/translatorService';

const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');

    const handleTranslate = useCallback((text: string) => {
        if (text.trim() === '') {
            setOutputText('');
        } else {
            const translated = translateText(text);
            setOutputText(translated);
        }
    }, []);

    useEffect(() => {
        // Debounce input to avoid translating on every keystroke, improving performance
        const handler = setTimeout(() => {
            handleTranslate(inputText);
        }, 250);

        return () => {
            clearTimeout(handler);
        };
    }, [inputText, handleTranslate]);
    
    const handleInputChange = (text: string) => {
        setInputText(text);
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <main className="w-full">
                <Header />
                <TranslatorCard
                    inputText={inputText}
                    outputText={outputText}
                    onInputChange={handleInputChange}
                    onClear={handleClear}
                />
            </main>
            <footer className="text-center mt-8 text-slate-500 text-sm">
                <p>Dibuat dengan ❤️ untuk warga Depok & sekitarnya.</p>
            </footer>
        </div>
    );
};

export default App;
