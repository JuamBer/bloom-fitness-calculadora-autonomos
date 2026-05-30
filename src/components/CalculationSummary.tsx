import { Building2, Check, Copy, FileText, Printer, Scale, ShieldCheck, User, Wallet } from 'lucide-react';
import { useState } from 'react';
import { ACCENT } from '../constants/colors';
import { CalculationMethod, CalculationResult, ProfessionalType } from '../types';

interface CalculationSummaryProps {
  result: CalculationResult;
  type: ProfessionalType;
  method: CalculationMethod;
}

export default function CalculationSummary({ result, type, method }: CalculationSummaryProps) {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(val);
  };

  const getRoleLabel = () => (type === 'fisio' ? 'Fisioterapeuta' : 'Nutricionista');
  
  const getMethodLabel = () => 
    method === 'flat' 
      ? 'Tramos Directos (Comisión sobre el total)' 
      : 'Tramos Acumulativos (Comisión escalonada)';

  // Build a summary text to copy to WhatsApp or email
  const handleCopyText = () => {
    const text = `🧾 *LIQUIDACIÓN MENSUAL - BLOOM FITNESS* 🧾
--------------------------------------------
*Profesional:* ${getRoleLabel()}
*Método de Cálculo:* ${getMethodLabel()}

💰 *Ingresos Brutos Totales:* ${formatCurrency(result.totalGrossIncome)}
🤝 *Comisión Media Aplicada:* ${result.appliedRate.toFixed(1)}%

📊 *DESGLOSE DE SALARIO:*
• Ingresos Brutos Profesional: ${formatCurrency(result.professionalGross)}
• Comisión Empresa (Bloom): ${formatCurrency(result.companyGross)}
• Retención IRPF (${result.irpfRate}%): -${formatCurrency(result.irpfAmount)}

💸 *INGRESO NETO PROFESIONAL:* ${formatCurrency(result.professionalNet)}
--------------------------------------------
Generado el ${new Date().toLocaleDateString('es-ES')} en la calculadora Bloom Fitness.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Determine split percentages for visual progress bar
  const professionalPercent = result.totalGrossIncome > 0 
    ? (result.professionalGross / result.totalGrossIncome) * 100 
    : 70;
  const companyPercent = 100 - professionalPercent;

  return (
    <div className="space-y-6">
      {/* Visual representation of split */}
      <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 shadow-2xl">
        <h3 className="font-semibold text-white text-base mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5" color={ACCENT[type]} />
          Proporción del Reparto (Neto vs Empresa)
        </h3>

        {result.totalGrossIncome > 0 ? (
          <div>
            <div className="flex h-4 rounded-full overflow-hidden bg-black mb-3 font-mono text-[9px] text-white">
              <div 
                style={{ width: `${professionalPercent}%`, backgroundColor: ACCENT[type] }} 
                className="text-black flex items-center justify-center font-bold tracking-wider transition-all duration-500"
              >
                {professionalPercent >= 15 ? `${professionalPercent.toFixed(1)}%` : ''}
              </div>
              <div 
                style={{ width: `${companyPercent}%` }} 
                className="bg-[#2a2a2a] text-gray-300 flex items-center justify-center font-bold tracking-wider transition-all duration-500"
              >
                {companyPercent >= 15 ? `${companyPercent.toFixed(1)}%` : ''}
              </div>
            </div>

            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1.5 font-medium" style={{ color: ACCENT[type] }}>
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: ACCENT[type] }}></span>
                <span>Profesional ({formatCurrency(result.professionalGross)})</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600 inline-block"></span>
                <span>Bloom Fitness ({formatCurrency(result.companyGross)})</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-gray-500">
            Introduce un monto de ingresos superior a 0 para ver el reparto gráfico.
          </div>
        )}
      </div>

      {/* Main Breakdown Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1: Gross Professional */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Bruto Autónomo</span>
            <div className={`p-2 bg-[${ACCENT[type]}]/10 text-[${ACCENT[type]}] rounded-lg`}>
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-xl font-bold text-white break-words">
            {formatCurrency(result.professionalGross)}
          </div>
          <div className="text-[10px] text-gray-500 mt-1 select-none">
            Promedio: <span className="font-semibold" style={{ color: ACCENT[type] }}>{result.appliedRate.toFixed(1)}%</span>
          </div>
        </div>

        {/* Metric Card 2: Company Cut */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Comisión Bloom</span>
            <div className="p-2 bg-white/5 text-gray-300 rounded-lg">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-xl font-bold text-white break-words">
            {formatCurrency(result.companyGross)}
          </div>
          <div className="text-[10px] text-gray-500 mt-1 select-none">
            Empresa: <span className="font-semibold text-gray-400">{(100 - result.appliedRate).toFixed(1)}%</span>
          </div>
        </div>

        {/* Metric Card 3: IRPF Amount */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pago IRPF</span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-xl font-bold text-amber-500 break-words">
            -{formatCurrency(result.irpfAmount)}
          </div>
          <div className="text-[10px] text-gray-500 mt-1 select-none">
            Retenido: <span className="font-semibold text-amber-500">{result.irpfRate}%</span>
          </div>
        </div>

        {/* Metric Card 4: Net Professional */}
        <div style={{ backgroundColor: ACCENT[type] }} className={`rounded-2xl p-5 shadow-lg text-black`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-black/70 uppercase tracking-wide">Líquido Neto</span>
            <div className="p-2 bg-black/10 text-black rounded-lg">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-xl font-extrabold text-black break-words">
            {formatCurrency(result.professionalNet)}
          </div>
          <div className="text-[10px] text-black/60 mt-1 select-none">
            Importe neto a percibir
          </div>
        </div>
      </div>

      {/* Printable Receipt and copy controls */}
      <div className="bg-[#0d0d0d] text-gray-200 rounded-2xl border border-white/10 p-6 shadow-3xl relative overflow-hidden" id="liquidacio-print-area">
        {/* Background decorative accent resembling physical paper lines */}
        <div className="absolute right-0 top-0 w-24 h-24 rounded-bl-full pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${ACCENT[type]}10, transparent 70%)` }}></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" color={ACCENT[type]} />
            <div>
              <h4 className="font-bold text-sm tracking-wide uppercase text-white">Recibo de Comisión Autónomo</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Bloom Fitness S.L. • Resumen para el Colaborador</p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleCopyText}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                copied 
                  ? 'bg-[#141414] border-white/5' 
                  : 'bg-[#141414] text-gray-300 border-white/5 hover:bg-white/5'
              }`}
              style={copied ? { color: ACCENT[type], borderColor: `${ACCENT[type]}33` } : {}}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '¡Copiado!' : 'Copiar Resumen'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#141414] text-gray-300 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir
            </button>
          </div>
        </div>

        {/* Content table */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs pb-3 border-b border-white/5 ">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Línea de Servicio</span>
              <span className="font-bold text-white">{getRoleLabel()} colaborador</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block text-[10px] uppercase">Fecha Liquidación</span>
              <span className="font-bold text-white font-mono">{new Date().toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {/* Headers row */}
            <div className="flex justify-between font-semibold border-b border-white/5 pb-1 text-[10px] text-gray-500 uppercase tracking-wide">
              <span>Concepto de Facturación</span>
              <span className="font-mono text-right">Monto</span>
            </div>

            {/* Calculations breakdown listed line-by-line */}
            <div className="flex justify-between py-1 text-gray-300 border-b border-dashed border-white/5">
              <span>Ingresos Brutos Globales Facturados</span>
              <span className="font-mono text-right text-white">{formatCurrency(result.totalGrossIncome)}</span>
            </div>

            <div className="py-2.5 bg-black/45 rounded-lg px-3 space-y-1 my-2">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between" style={{ color: ACCENT[type] }}>
                <span>Desglose {getMethodLabel()}</span>
                <span>Proporción</span>
              </div>
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-400 text-[11px] gap-2">
                  <span className="italic overflow-hidden text-ellipsis whitespace-nowrap">{item.rangeLabel}</span>
                  <div className="font-mono text-right shrink-0 text-gray-300">
                    <span>{formatCurrency(item.bracketAmount)} × {item.rate}% = </span>
                    <span className="font-semibold" style={{ color: ACCENT[type] }}>{formatCurrency(item.professionalPortion)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-1 font-semibold border-b border-white/5" style={{ color: ACCENT[type] }}>
              <span>Honorarios Brutos Profesional ({result.appliedRate.toFixed(1)}%)</span>
              <span className="font-mono text-right">{formatCurrency(result.professionalGross)}</span>
            </div>

            <div className="flex justify-between py-1 text-gray-400 border-b border-white/5">
              <span>Comisión de Gestión Bloom Fitness ({(100 - result.appliedRate).toFixed(1)}%)</span>
              <span className="font-mono text-right">{formatCurrency(result.companyGross)}</span>
            </div>

            <div className="flex justify-between py-1 text-amber-500 italic">
              <span>Retención de Hacienda (IRPF {result.irpfRate}%)</span>
              <span className="font-mono text-right">-{formatCurrency(result.irpfAmount)}</span>
            </div>

            {/* Final Total Net row */}
            <div className="flex justify-between pt-3 text-sm font-bold text-white border-t border-white/10">
              <span className="uppercase" style={{ color: ACCENT[type] }}>Total Líquido Neto Profesional</span>
              <span className="font-mono text-base" style={{ color: ACCENT[type] }}>{formatCurrency(result.professionalNet)}</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
