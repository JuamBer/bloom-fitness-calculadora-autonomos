import { CommissionBracket, ProfessionalType, CalculationMethod, CalculationResult } from '../types';

export const BRACKETS: Record<ProfessionalType, CommissionBracket[]> = {
  fisio: [
    { min: 0, max: 2000, professionalRate: 70, companyRate: 30 },
    { min: 2000, max: 3000, professionalRate: 75, companyRate: 25 },
    { min: 3000, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
  nutri: [
    { min: 0, max: 500, professionalRate: 70, companyRate: 30 },
    { min: 500, max: 1000, professionalRate: 75, companyRate: 25 },
    { min: 1000, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
};

/**
 * Perform commission, split, and tax calculations.
 */
export function calculateSalary(
  totalGrossIncome: number,
  type: ProfessionalType,
  method: CalculationMethod,
  irpfRate: number
): CalculationResult {
  const selectedBrackets = BRACKETS[type];
  const normalizedIncome = Math.max(0, totalGrossIncome);
  const normalizedIrpf = Math.max(0, Math.min(100, irpfRate));

  let professionalGross = 0;
  let companyGross = 0;
  let appliedRate = 70; // fallback default
  const breakdown: CalculationResult['breakdown'] = [];

  if (method === 'flat') {
    // Flat/Direct bracket calculation: Entire income takes the rate of the highest bracket reached
    const activeBracket = selectedBrackets.find(
      (b) => normalizedIncome > b.min && normalizedIncome <= b.max
    ) || selectedBrackets[selectedBrackets.length - 1]; // Fallback to last bracket if somehow not matched

    professionalGross = normalizedIncome * (activeBracket.professionalRate / 100);
    companyGross = normalizedIncome * (activeBracket.companyRate / 100);
    appliedRate = activeBracket.professionalRate;

    // Create a single breakdown block representing the flat calculation
    breakdown.push({
      bracketIndex: 0,
      rangeLabel: `Todo el volumen (${activeBracket.min === 0 ? '0' : activeBracket.min}€ a ${activeBracket.max === Infinity ? '+' : activeBracket.max}€)`,
      bracketAmount: normalizedIncome,
      rate: activeBracket.professionalRate,
      professionalPortion: professionalGross,
      companyPortion: companyGross,
    });
  } else {
    // Marginal/Escalonado calculation: Calculated sequentially step-by-step
    selectedBrackets.forEach((b, idx) => {
      if (normalizedIncome <= b.min) return;

      const rangeMax = b.max;
      const rangeMin = b.min;
      const applicableAmount = Math.min(normalizedIncome, rangeMax) - rangeMin;

      if (applicableAmount <= 0) return;

      const profPortion = applicableAmount * (b.professionalRate / 100);
      const compPortion = applicableAmount * (b.companyRate / 100);

      professionalGross += profPortion;
      companyGross += compPortion;

      const maxLabel = rangeMax === Infinity ? '+' : `${rangeMax}€`;
      breakdown.push({
        bracketIndex: idx,
        rangeLabel: `Tramo ${idx + 1}: ${rangeMin}€ a ${maxLabel}`,
        bracketAmount: applicableAmount,
        rate: b.professionalRate,
        professionalPortion: profPortion,
        companyPortion: compPortion,
      });
    });

    appliedRate = totalGrossIncome > 0 ? (professionalGross / totalGrossIncome) * 100 : 70;
  }

  const irpfAmount = professionalGross * (normalizedIrpf / 100);
  const professionalNet = professionalGross - irpfAmount;

  return {
    totalGrossIncome: normalizedIncome,
    professionalGross,
    companyGross,
    appliedRate,
    irpfRate: normalizedIrpf,
    irpfAmount,
    professionalNet,
    breakdown,
  };
}
