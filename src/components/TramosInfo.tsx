import { Award, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ACCENT } from '../constants/colors';
import { ProfessionalType } from '../types';
import { BRACKETS } from '../utils/calculator';

interface TramosInfoProps {
  currentType: ProfessionalType;
  currentIncome: number;
}

export default function TramosInfo({ currentType, currentIncome }: TramosInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-2xl transition-all duration-300">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6" color={ACCENT[currentType]} />
            <h3 className="font-extrabold text-white text-xl sm:text-2xl tracking-tight">Calculadora Salarial de Autónomos: Estructura de Tramos de Comisión</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
            Acuerdo escalonativo de comisiones en base a la facturación mensual por el método marginal.
          </p>
        </div>
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 transition-all text-gray-400 hover:text-white"
          aria-label="Toggle tramos view"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5 cursor-pointer" /> : <ChevronDown className="w-5 h-5 cursor-pointer" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6 pt-6 mt-6 border-t border-white/5 animate-fade-in text-left">
          <p className="text-sm text-gray-400 leading-relaxed">
            Las comisiones se asignan según la facturación bruta total del mes de forma escalonada con el **método marginal**. El porcentaje para el profesional aumenta a medida que supera cada nivel de ingresos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Fisioterapeutas Column */}
        <div 
          className="p-6 rounded-2xl border transition-all duration-305 space-y-4"
          style={currentType === 'fisio' ? {
            backgroundColor: `${ACCENT.fisio}1a`,
            borderColor: `${ACCENT.fisio}66`,
            boxShadow: `0 0 0 1px ${ACCENT.fisio}33, 0 20px 25px -5px ${ACCENT.fisio}0d`
          } : { borderColor: 'rgba(255,255,255,0.05)', opacity: 0.5 }}>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-extrabold text-gray-200 text-sm uppercase tracking-widest">Fisioterapeutas</span>
            {currentType === 'fisio' && (
              <span
                className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border"
                style={{ backgroundColor: `${ACCENT.fisio}26`, color: ACCENT.fisio, borderColor: `${ACCENT.fisio}4d` }}
              >
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
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${!isActive ? 'bg-[#0f0f0f] hover:bg-[#181818] text-gray-300' : ''}`}
                  style={isActive ? {
                    backgroundColor: ACCENT.fisio,
                    color: 'black',
                    boxShadow: `0 10px 15px -3px ${ACCENT.fisio}33`,
                    fontWeight: 'bold',
                    transform: 'scale(1.03)',
                    border: `1px solid ${ACCENT.fisio}`
                  } : { border: '1px solid rgba(255,255,255,0.05)' }}
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
        <div 
          className="p-6 rounded-2xl border transition-all duration-305 space-y-4"
          style={currentType === 'nutri' ? {
            backgroundColor: `${ACCENT.nutri}1a`,
            borderColor: `${ACCENT.nutri}66`,
            boxShadow: `0 0 0 1px ${ACCENT.nutri}33, 0 20px 25px -5px ${ACCENT.nutri}0d`
          } : { borderColor: 'rgba(255,255,255,0.05)', opacity: 0.5 }}>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-extrabold text-gray-200 text-sm uppercase tracking-widest">Nutricionistas</span>
            {currentType === 'nutri' && (
              <span
                className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border"
                style={{ backgroundColor: `${ACCENT.nutri}26`, color: ACCENT.nutri, borderColor: `${ACCENT.nutri}4d` }}
              >
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
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${!isActive ? 'bg-[#0f0f0f] hover:bg-[#181818] text-gray-300' : ''}`}
                  style={isActive ? {
                    backgroundColor: ACCENT.nutri,
                    color: 'black',
                    boxShadow: `0 10px 15px -3px ${ACCENT.nutri}33`,
                    fontWeight: 'bold',
                    transform: 'scale(1.03)',
                    border: `1px solid ${ACCENT.nutri}`
                  } : { border: '1px solid rgba(255,255,255,0.05)' }}
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
    </div>
   )}
  </div>
 );
}
