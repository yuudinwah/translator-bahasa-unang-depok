
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center p-6 bg-white shadow-md rounded-lg mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Penerjemah Bahasa Unang Depok
            </h1>
            <p className="mt-2 text-md sm:text-lg text-slate-600">
                Menerjemahkan Bahasa Indonesia ke bahasa gaul Depok berdasarkan pola linguistik yang unik.
            </p>
            <div className="mt-4 text-left text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <p>Pola dasarnya adalah <code className="bg-slate-200 text-slate-700 font-mono p-1 rounded-md text-sm">U(x) (b)n(c)ng</code>, namun ada beberapa aturan khusus:</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>
                        <strong>Aturan Konsonan:</strong> Konsonan di akhir suku kata bisa "pindah" ke suku kata terakhir.
                        <br/><em className="text-slate-400 ml-4">Contoh: <strong className="text-slate-600">Hancur</strong> &rarr; Uncar hanung</em>
                        <br/><em className="text-slate-400 ml-4">Contoh: <strong className="text-slate-600">Sebentar</strong> &rarr; Untar sebenang</em>
                    </li>
                    <li>
                        <strong>Aturan Satu Suku Kata:</strong> Bagian (b) dihilangkan.
                        <br/><em className="text-slate-400 ml-4">Contoh: <strong className="text-slate-600">Bel</strong> &rarr; Ubal neng</em>
                    </li>
                    <li>
                        <strong>Aturan Akhiran 'nya':</strong> Pola diterapkan pada kata dasarnya.
                        <br/><em className="text-slate-400 ml-4">Contoh: <strong className="text-slate-600">Sepedanya</strong> &rarr; Uda sepenangnya</em>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;