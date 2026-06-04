export const COMMISSIONS = {
  fisio: [
    { min: 0, max: 1250, professionalRate: 70, companyRate: 30 },
    { min: 1250, max: 2500, professionalRate: 75, companyRate: 25 },
    { min: 2500, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
  nutri: [
    { min: 0, max: 100, professionalRate: 70, companyRate: 30 },
    { min: 100, max: 500, professionalRate: 75, companyRate: 25 },
    { min: 500, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
} as const;
