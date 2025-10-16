import React, { useState } from 'react';

// Inlined SVG Icon Components to reduce file count.
const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const ClearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SwapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 7 4 3l4-4" />
        <path d="M4 3h16" />
        <path d="m16 21 4-4-4-4" />
        <path d="M20 17H4" />
    </svg>
);


interface TranslatorCardProps {
    direction: 'toUnang' | 'fromUnang';
    sourceText: string;
    translatedText: string;
    onInputChange: (text: string) => void;
    onClear: () => void;
    onSwap: () => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ direction, sourceText, translatedText, onInputChange, onClear, onSwap }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!translatedText) return;
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isToUnang = direction === 'toUnang';
    const sourceLabel = isToUnang ? 'Bahasa Indonesia' : 'Bahasa Unang Depok';
    const translatedLabel = isToUnang ? 'Bahasa Unang Depok' : 'Bahasa Indonesia';
    const sourcePlaceholder = isToUnang ? 'Ketik atau tempel teks di sini...' : 'Masukan teks Unang...';
    const translatedPlaceholder = isToUnang ? 'Hasil terjemahan...' : 'Indonesian translation...';

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
                {/* Source Language Area */}
                <div className="w-full flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                         <label htmlFor="source-text" className="text-sm font-semibold text-slate-500 uppercase">{sourceLabel}</label>
                        {sourceText && (
                            <button
                                onClick={onClear}
                                className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full"
                                aria-label="Clear input"
                            >
                                <ClearIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <textarea
                        id="source-text"
                        value={sourceText}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder={sourcePlaceholder}
                        className="w-full flex-grow p-4 border-2 border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-slate-50 text-slate-800 h-64 sm:h-72"
                    />
                </div>

                {/* Swap Button */}
                <div className="flex-shrink-0 my-2 md:my-0">
                    <button
                        onClick={onSwap}
                        className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-teal-100 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
                        aria-label="Swap translation direction"
                    >
                        <SwapIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Translated Language Area */}
                <div className="w-full flex flex-col">
                    <div className="flex justify-between items-center mb-2 h-7">
                        <label htmlFor="translated-text" className="text-sm font-semibold text-slate-500 uppercase">{translatedLabel}</label>
                         {translatedText && (
                            <button
                                onClick={handleCopy}
                                className="text-slate-500 hover:text-teal-600 transition-all duration-200 flex items-center bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200"
                                aria-label="Copy output"
                            >
                                {copied ? (
                                    <span className="text-xs text-teal-600 font-semibold">Tersalin!</span>
                                ) : (
                                    <CopyIcon className="w-4 h-4" />
                                )}
                            </button>
                        )}
                    </div>
                    <textarea
                        id="translated-text"
                        value={translatedText}
                        readOnly
                        placeholder={translatedPlaceholder}
                        className="w-full flex-grow p-4 border-2 border-slate-200 rounded-lg resize-none bg-slate-100 text-slate-900 font-medium cursor-not-allowed h-64 sm:h-72"
                    />
                </div>
            </div>
        </div>
    );
};

export default TranslatorCard;
