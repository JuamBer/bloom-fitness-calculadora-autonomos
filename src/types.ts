/**
 * Types and structures for the Bloom Fitness commission calculator.
 */

export type ProfessionalType = 'fisio' | 'nutri';

export type CalculationMethod = 'flat' | 'marginal';

export interface CommissionBracket {
  min: number;
  max: number; // Use Infinity for the last bracket
  professionalRate: number; // e.g., 70 for 70%
  companyRate: number; // e.g., 30 for 30%
}

export interface DetailedService {
  id: string;
  date: string;
  clientName: string;
  concept: string;
  amount: number;
}

export interface CalculationResult {
  totalGrossIncome: number;
  professionalGross: number;
  companyGross: number;
  appliedRate: number; // Overall composite rate (or the active flat rate)
  irpfRate: number; // e.g., 15 for 15%
  irpfAmount: number;
  professionalNet: number;
  // Bracket-by-bracket breakdown for display
  breakdown: Array<{
    bracketIndex: number;
    rangeLabel: string;
    bracketAmount: number;
    rate: number;
    professionalPortion: number;
    companyPortion: number;
  }>;
}
