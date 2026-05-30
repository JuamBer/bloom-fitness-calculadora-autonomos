import React, { useState, useMemo } from 'react';
import { DetailedService } from '../types';
import { Plus, Trash2, Search, FileDown, Layers, Sparkles, RefreshCw } from 'lucide-react';

interface DetailedServiceManagerProps {
  services: DetailedService[];
  onAddService: (newService: Omit<DetailedService, 'id'>) => void;
  onDeleteService: (id: string) => void;
  onClearAll: () => void;
  onLoadPreset: (presetId: string) => void;
  activePresetId: string;
}

export default function DetailedServiceManager({
  services,
  onAddService,
  onDeleteService,
  onClearAll,
  onLoadPreset,
  activePresetId,
}: DetailedServiceManagerProps) {
  // Add service form state
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [clientName, setClientName] = useState('');
  const [concept, setConcept] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Error validations
  const [formError, setFormError] = useState('');

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!clientName.trim()) {
      setFormError('Introduce el nombre del cliente');
      return;
    }
    if (!concept.trim()) {
      setFormError('Introduce el concepto del servicio');
      return;
    }
    
    const parsedAmount = parseFloat(amountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError('El importe debe ser un número superior a 0');
      return;
    }

    onAddService({
      date,
      clientName: clientName.trim(),
      concept: concept.trim(),
      amount: parsedAmount,
    });

    // Reset fields except date for fast logging
    setClientName('');
    setConcept('');
    setAmountInput('');
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter(
      (s) =>
        s.clientName.toLowerCase().includes(q) ||
        s.concept.toLowerCase().includes(q)
    );
  }, [services, searchQuery]);

  // Aggregate stats
  const totalSum = useMemo(() => {
    return services.reduce((acc, curr) => acc + curr.amount, 0);
  }, [services]);

  // Export CSV helper
  const handleExportCSV = () => {
    if (services.length === 0) return;
    
    const headers = ['Fecha', 'Cliente', 'Concepto/Servicio', 'Importe (€)'];
    const rows = services.map(s => [
      s.date,
      `"${s.clientName.replace(/"/g, '""')}"`,
      `"${s.concept.replace(/"/g, '""')}"`,
      s.amount.toFixed(2)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\r\n');
    
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `registro_servicios_bloom_fitness_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Registro Detallado de Servicios
          </h3>
          <p className="text-xs text-gray-450 mt-1">
            Los ingresos brutos se calcularán sumando individualmente cada servicio o consulta.
          </p>
        </div>
        
        {services.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 self-start sm:self-auto rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15 transition-colors cursor-pointer border border-emerald-500/20"
          >
            <FileDown className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form panel */}
        <div className="lg:col-span-2 bg-black/40 rounded-xl p-5 border border-white/5">
          <h4 className="font-semibold text-gray-200 text-sm mb-3.5 block border-b border-white/5 pb-2">
            Añadir Nuevo Servicio / Sesión
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Fecha del Servicio
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-gray-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Cliente / Paciente
              </label>
              <input
                type="text"
                placeholder="Ej. Juan Gómez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-gray-205 placeholder:text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Concepto / Sesión
              </label>
              <input
                type="text"
                placeholder="Ej. Sesión Fisioterapia Deportiva"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-gray-205 placeholder:text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Importe del Cobro (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ej. 65"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg pl-3 pr-7 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-gray-200 font-mono font-medium placeholder:text-gray-600"
                  required
                />
                <span className="absolute right-3 top-2 text-gray-500 text-xs">€</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-450 text-black font-bold text-xs rounded-lg transition-colors shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black" />
              Añadir al Listado
            </button>
          </form>
        </div>

        {/* Table/List panel */}
        <div className="lg:col-span-3 flex flex-col h-full min-h-[300px]">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar cliente o servicio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-gray-200 placeholder:text-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-gray-400 hover:text-white text-[10px] font-bold"
                >
                  X
                </button>
              )}
            </div>

            {services.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/15 border border-red-500/20 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                title="Borrar todos los servicios del mes actual"
              >
                Vaciar Lista (Suma: {totalSum.toFixed(2)}€)
              </button>
            )}
          </div>

          {/* List display */}
          <div className="flex-1 overflow-y-auto max-h-[350px] border border-white/5 rounded-xl">
            {filteredServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-black/20 text-gray-500 min-h-[220px]">
                <Sparkles className="w-8 h-8 text-gray-700 mb-2" />
                <p className="text-xs font-medium text-gray-450">No hay servicios registrados en la lista</p>
                <p className="text-[11px] text-gray-550 max-w-xs mt-1">
                  Usa el formulario de la izquierda para registrar manualmente cada sesión o consulta, o bien selecciona un escenario de pruebas de simulación arriba.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#181818] border-b border-white/5 sticky top-0 text-gray-400 font-semibold">
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Concepto</th>
                    <th className="p-3 text-right">Monto</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredServices.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 text-gray-300 transition-colors">
                      <td className="p-3 whitespace-nowrap text-gray-500 font-mono text-[11px]">{s.date}</td>
                      <td className="p-3 font-semibold text-white">{s.clientName}</td>
                      <td className="p-3 text-gray-400">{s.concept}</td>
                      <td className="p-3 text-right font-mono font-medium text-emerald-400">{s.amount.toFixed(2)}€</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => onDeleteService(s.id)}
                          className="p-1 text-red-400/70 hover:text-red-300 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Eliminar este servicio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Prompt info */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 px-1">
            <span>Mostrando {filteredServices.length} de {services.length} servicios</span>
            <span className="font-semibold text-gray-400">Suma Total: <span className="font-mono text-emerald-400">{totalSum.toFixed(2)}€</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
