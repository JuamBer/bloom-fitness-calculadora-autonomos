import React, { useState } from 'react';
import { ProfessionalType } from '../types';
import { BRACKETS } from '../utils/calculator';
import { TrendingUp, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface TramosInfoProps {
  currentType: ProfessionalType;
  currentIncome: number;
}

export default function TramosInfo({ currentType, currentIncome }: TramosInfoProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-2xl transition-all duration-300">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-extrabold text-white text-xl sm:text-2xl tracking-tight">Estructura de Tramos de Comisión</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
            Acuerdo escalonativo de comisiones en base a la facturación mensual por el método marginal.
          </p>
        </div>
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all text-gray-400 hover:text-white"
          aria-label="Toggle tramos view"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6 pt-6 mt-6 border-t border-white/5 animate-fade-in text-left">
          <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
            Las comisiones se asignan según la facturación bruta total del mes de forma escalonada con el **método marginal**. El porcentaje para el profesional aumenta a medida que supera cada nivel de ingresos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Fisioterapeutas Column */}
        <div className={`p-6 rounded-2xl border transition-all duration-305 space-y-4 ${
          currentType === 'fisio' 
            ? 'bg-black/40 border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-xl shadow-emerald-500/5' 
            : 'bg-transparent border-white/5 opacity-50'
        }`}>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-extrabold text-gray-200 text-sm uppercase tracking-widest">Fisioterapeutas</span>
            {currentType === 'fisio' && (
              <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/30">
                Rol Activo
              </span>
            )}
          </div>
          <div className="space-y-3">
            {BRACKETS.fisio.map((b, idx) => {
              const maxLabel = b.max === Infinity ? 'En adelante' : `hasta ${b.max}€`;
              const rangeText = b.min === 0 ? `Hasta ${b.max}€` : `De ${b.min}€ a ${maxLabel}`;
              
              // Is this the currently active bracket for the selection?
              const isActive = currentType === 'fisio' && currentIncome > b.min && currentIncome <= b.max;

              return (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold scale-[1.03] transform border border-emerald-400' 
                      : 'bg-[#0f0f0f] hover:bg-[#181818] text-gray-300 border border-white/5'
                  }`}
                >
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-sm font-bold tracking-tight">{rangeText}</span>
                    <span className={`text-[11px] ${isActive ? 'text-black/80 font-medium' : 'text-gray-500'}`}>
                      Fisio {b.professionalRate}% / {b.companyRate}% Empresa
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-black font-mono text-base">
                    <span>{b.professionalRate}%</span>
                    {isActive && <Award className="w-4 h-4 text-black animate-bounce" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutritionists Column */}
        <div className={`p-6 rounded-2xl border transition-all duration-305 space-y-4 ${
          currentType === 'nutri' 
            ? 'bg-black/40 border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-xl shadow-emerald-500/5' 
            : 'bg-transparent border-white/5 opacity-50'
        }`}>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-extrabold text-gray-200 text-sm uppercase tracking-widest">Nutricionistas</span>
            {currentType === 'nutri' && (
              <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/30">
                Rol Activo
              </span>
            )}
          </div>
          <div className="space-y-3">
            {BRACKETS.nutri.map((b, idx) => {
              const maxLabel = b.max === Infinity ? 'En adelante' : `hasta ${b.max}€`;
              const rangeText = b.min === 0 ? `Hasta ${b.max}€` : `De ${b.min}€ a ${maxLabel}`;
              
              // Is this the currently active bracket for the selection?
              const isActive = currentType === 'nutri' && currentIncome > b.min && currentIncome <= b.max;

              return (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold scale-[1.03] transform border border-emerald-400' 
                      : 'bg-[#0f0f0f] hover:bg-[#181818] text-gray-300 border border-white/5'
                  }`}
                >
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-sm font-bold tracking-tight">{rangeText}</span>
                    <span className={`text-[11px] ${isActive ? 'text-black/80 font-medium' : 'text-gray-500'}`}>
                      Nutri {b.professionalRate}% / {b.companyRate}% Empresa
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-black font-mono text-base">
                    <span>{b.professionalRate}%</span>
                    {isActive && <Award className="w-4 h-4 text-black animate-bounce" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 p-4 rounded-xl bg-black/60 border border-white/5 text-[12px] text-gray-400 leading-relaxed shadow-inner">
        <span className="font-bold text-emerald-400 shrink-0">💡 Indicador Inteligente:</span>
        <span>El tramo que corresponde a los ingresos brutos indicados se resalta automáticamente en verde con un efecto de relieve visual.</span>
      </div>
    </div>
   )}
  </div>
 );
}
