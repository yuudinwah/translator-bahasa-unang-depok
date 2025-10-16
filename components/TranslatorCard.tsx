
import React, { useState } from 'react';

// Inlined SVG Icon Components to reduce file count for this simple app.
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

interface TranslatorCardProps {
    inputText: string;
    outputText: string;
    onInputChange: (text: string) => void;
    onClear: () => void;
}

const TranslatorCard: React.FC<TranslatorCardProps> = ({ inputText, outputText, onInputChange, onClear }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Input Area */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                         <label htmlFor="input-text" className="text-sm font-semibold text-slate-500 uppercase">Bahasa Indonesia</label>
                        {inputText && (
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
                        id="input-text"
                        value={inputText}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Ketik atau tempel teks di sini..."
                        className="w-full flex-grow p-4 border-2 border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-slate-50 text-slate-800 h-64 sm:h-72"
                    />
                </div>

                {/* Output Area */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2 h-7">
                        <label htmlFor="output-text" className="text-sm font-semibold text-slate-500 uppercase">Bahasa Unang Depok</label>
                         {outputText && (
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
                        id="output-text"
                        value={outputText}
                        readOnly
                        placeholder="Hasil terjemahan..."
                        className="w-full flex-grow p-4 border-2 border-slate-200 rounded-lg resize-none bg-slate-100 text-slate-900 font-medium cursor-not-allowed h-64 sm:h-72"
                    />
                </div>
            </div>
        </div>
    );
};

export default TranslatorCard;
