import {
  Coins
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CalculationSummary from './components/CalculationSummary';
import TramosInfo from './components/TramosInfo';
import { ACCENT } from './constants/colors';
import { ProfessionalType } from './types';
import { calculateSalary } from './utils/calculator';

export default function App() {
  // --- Persistent State ---
  const [type, setType] = useState<ProfessionalType>(() => {
    const saved = localStorage.getItem('bloom_calc_type');
    return (saved as ProfessionalType) || 'fisio';
  });

  const [quickGross, setQuickGross] = useState<number>(() => {
    const saved = localStorage.getItem('bloom_calc_quickGross');
    return saved ? parseFloat(saved) : 0;
  });

  const [irpfRate, setIrpfRate] = useState<number>(() => {
    const saved = localStorage.getItem('bloom_calc_irpfRate');
    return saved ? parseFloat(saved) : 0;
  });

  // Always apply marginal calculation method
  const method = 'marginal';

  // --- Sync storage ---
  useEffect(() => {
    localStorage.setItem('bloom_calc_type', type);
  }, [type]);

  useEffect(() => {
    localStorage.setItem('bloom_calc_quickGross', quickGross.toString());
  }, [quickGross]);

  useEffect(() => {
    localStorage.setItem('bloom_calc_irpfRate', irpfRate.toString());
  }, [irpfRate]);

  // Adjust default quickGross when type changes directly
  const handleTypeChange = (newType: ProfessionalType) => {
    setType(newType);
    const defaultVal = 1000;
    setQuickGross(defaultVal);
  };

  const totalGrossIncome = quickGross;

  const calculationResult = useMemo(() => {
    return calculateSalary(totalGrossIncome, type, method, irpfRate);
  }, [totalGrossIncome, type, method, irpfRate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 pb-12 print:bg-white print:text-black print:pb-0">

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">

        {/* Estructura de Tramos de Comisión: 100% full-width collapsible reference table */}
        <TramosInfo currentType={type} currentIncome={totalGrossIncome} />

        {/* Central Dashboard Workspace: Form vs Outputs splitting */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Inputs configuration */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            
            {/* Main Config Card */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 shadow-2xl space-y-6">
              <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-white/5 pb-3">
                <Coins className="w-5 h-5" color={ACCENT[type]} />
                Configurar Liquidación
              </h3>

              {/* 1. Toggle Profesional */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  1. Rol del Profesional Colaborador
                </label>
                <div className="flex p-1 bg-black/40 rounded-xl">
                  <button
                    onClick={() => handleTypeChange('fisio')}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer text-gray-400 hover:text-white"
                    style={type === 'fisio' ? { backgroundColor: ACCENT.fisio, color: 'black', fontWeight: 'bold' } : {}}
                  >
                    Fisioterapeuta
                  </button>

                  <button
                    onClick={() => handleTypeChange('nutri')}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer text-gray-400 hover:text-white"
                    style={type === 'nutri' ? { backgroundColor: ACCENT.nutri, color: 'black', fontWeight: 'bold' } : {}}
                  >
                    Nutricionista
                  </button>
                </div>
              </div>

              {/* 2. Ingresos Brutos Totales */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      2. Ingresos Brutos Totales (€)
                    </label>
                    <span style={{ color: ACCENT[type] }} className="text-sm font-mono font-bold">{quickGross.toLocaleString('es-ES')} €</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={quickGross || ''}
                      onChange={(e) => setQuickGross(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-2xl font-mono focus:outline-none transition-colors"
                      style={{ color: ACCENT[type] }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Irpf config */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-sans">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      3. Retención IRPF a Aplicar (%)
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-500">{irpfRate}%</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={irpfRate}
                      onChange={(e) => setIrpfRate(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-2xl font-mono text-gray-200 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Summaries receipts */}
          <div className="lg:col-span-7 space-y-6">
            <CalculationSummary 
              result={calculationResult} 
              type={type} 
              method={method} 
            />
          </div>

        </section>

      </main>

    </div>
  );
}
