
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center p-6 bg-white shadow-md rounded-lg mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Penerjemah Bahasa Unang Depok
            </h1>
            <p className="mt-2 text-md sm:text-lg text-slate-600">
                Menerjemahkan Bahasa Indonesia ke bahasa gaul Depok dengan pola: <code className="bg-slate-200 text-slate-700 font-mono p-1 rounded-md text-sm">U(x) (b)n(c)ng</code>
            </p>
            <div className="mt-4 text-left text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
                <p><strong className="font-semibold text-slate-700 w-6 inline-block">x:</strong> Suku kata terakhir, semua vokal diubah menjadi 'a'.</p>
                <p><strong className="font-semibold text-slate-700 w-6 inline-block">b:</strong> Kata asli tanpa suku kata terakhir.</p>
                <p><strong className="font-semibold text-slate-700 w-6 inline-block">c:</strong> Vokal terakhir dari suku kata terakhir asli.</p>
            </div>
        </header>
    );
};

export default Header;