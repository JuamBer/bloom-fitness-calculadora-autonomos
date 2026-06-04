export const COMMISSIONS = {
  fisio: [
    { min: 0, max: 1000, professionalRate: 70, companyRate: 30 },
    { min: 1000, max: 2000, professionalRate: 75, companyRate: 25 },
    { min: 2000, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
  nutri: [
    { min: 0, max: 100, professionalRate: 70, companyRate: 30 },
    { min: 100, max: 500, professionalRate: 75, companyRate: 25 },
    { min: 500, max: Infinity, professionalRate: 80, companyRate: 20 },
  ],
} as const;
