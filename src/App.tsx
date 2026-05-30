import React, { useState, useEffect, useMemo } from 'react';
import { ProfessionalType } from './types';
import { calculateSalary } from './utils/calculator';
import TramosInfo from './components/TramosInfo';
import CalculationSummary from './components/CalculationSummary';
import { 
  Coins, 
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // --- Persistent State ---
  const [type, setType] = useState<ProfessionalType>(() => {
    const saved = localStorage.getItem('bloom_calc_type');
    return (saved as ProfessionalType) || 'fisio';
  });

  const [quickGross, setQuickGross] = useState<number>(() => {
    const saved = localStorage.getItem('bloom_calc_quickGross');
    return saved ? parseFloat(saved) : 2500;
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
    const defaultVal = newType === 'fisio' ? 2500 : 750;
    setQuickGross(defaultVal);
  };

  const totalGrossIncome = quickGross;

  const calculationResult = useMemo(() => {
    return calculateSalary(totalGrossIncome, type, method, irpfRate);
  }, [totalGrossIncome, type, method, irpfRate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 pb-12 print:bg-white print:text-black print:pb-0">
      
      {/* Bloom Corporate Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0d0d0d] sticky top-0 z-40 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45"></div>
          </div>
          <h1 className="text-xl font-medium tracking-tight uppercase text-white">Bloom <span className="font-light opacity-50">Fitness</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-xs tracking-widest text-emerald-400 uppercase hidden md:block">Calculadora de Comisiones</div>
          <a 
            href="https://bloomfitness.es/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors"
          >
            Web Corporativa
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Banner Informative Card */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print:hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl relative z-10 space-y-3.5">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
              Herramienta Interna
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Calculadora Salarial de Autónomos
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Calcula de forma automática los salarios, comisiones corporativas, retenciones fiscales de IRPF y el importe neto a percibir para <strong>fisioterapeutas</strong> y <strong>nutricionistas</strong> colaboradores de Bloom Fitness.
            </p>
          </div>
        </div>

        {/* Estructura de Tramos de Comisión: 100% full-width collapsible reference table */}
        <TramosInfo currentType={type} currentIncome={totalGrossIncome} />

        {/* Central Dashboard Workspace: Form vs Outputs splitting */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Inputs configuration */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            
            {/* Main Config Card */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 shadow-2xl space-y-6">
              <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-white/5 pb-3">
                <Coins className="w-5 h-5 text-emerald-400" />
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
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      type === 'fisio'
                        ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Fisioterapeuta
                  </button>

                  <button
                    onClick={() => handleTypeChange('nutri')}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      type === 'nutri'
                        ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
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
                    <span className="text-sm font-mono font-bold text-emerald-400">{quickGross.toLocaleString('es-ES')} €</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={quickGross || ''}
                      onChange={(e) => setQuickGross(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-2xl font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
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
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-2xl font-mono text-gray-200 focus:outline-none focus:border-emerald-500/50 transition-colors"
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
