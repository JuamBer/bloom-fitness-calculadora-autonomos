import { DetailedService } from '../types';

export interface PresetScenario {
  id: string;
  name: string;
  role: 'fisio' | 'nutri';
  totalGrossIncome: number;
  description: string;
  services: DetailedService[];
}

export const SCENARIOS: PresetScenario[] = [
  {
    id: 'fisio-1',
    role: 'fisio',
    name: 'Fisio - Actividad Inicial',
    totalGrossIncome: 1450,
    description: 'Facturación por debajo de 2.000€ (Tramo del 70%)',
    services: [
      { id: 'f1-1', date: '2026-05-02', clientName: 'Carlos Gómez', concept: 'Tratamiento Fisioterapia Deportiva', amount: 65 },
      { id: 'f1-2', date: '2026-05-08', clientName: 'Elena Martínez', concept: 'Sesión de Osteopatía', amount: 80 },
      { id: 'f1-3', date: '2026-05-12', clientName: 'Sofía Ramos', concept: 'Rehabilitación de hombro (Bono 5x)', amount: 280 },
      { id: 'f1-4', date: '2026-05-15', clientName: 'Miguel Ángel', concept: 'Tratamiento Punción Seca', amount: 75 },
      { id: 'f1-5', date: '2026-05-19', clientName: 'Laura Ortiz', concept: 'Servicio de Fisioterapia General', amount: 60 },
      { id: 'f1-6', date: '2026-05-22', clientName: 'Gimnasio Bloom', concept: 'Taller de Ergonomía Grupal', amount: 350 },
      { id: 'f1-7', date: '2026-05-28', clientName: 'David Sanchis', concept: 'Fisioterapia Suelo Pélvico (Pack)', amount: 540 }
    ]
  },
  {
    id: 'fisio-2',
    role: 'fisio',
    name: 'Fisio - Actividad Media',
    totalGrossIncome: 2650,
    description: 'Facturación entre 2.000€ y 3.000€ (Tramo del 75%)',
    services: [
      { id: 'f2-1', date: '2026-05-02', clientName: 'Clara Pons', concept: 'Rehabilitación post-quirúrgica', amount: 450 },
      { id: 'f2-2', date: '2026-05-05', clientName: 'Roberto Gil', concept: 'Sesión Fisioterapia + Kinesiotaping', amount: 85 },
      { id: 'f2-3', date: '2026-05-09', clientName: 'Isabel Ruiz', concept: 'Bono 10 Sesiones Readaptación', amount: 600 },
      { id: 'f2-4', date: '2026-05-14', clientName: 'Javier Domenech', concept: 'Tratamiento Osteopatía Craneal', amount: 95 },
      { id: 'f2-5', date: '2026-05-18', clientName: 'Marta Soler', concept: 'Fisioterapia Deportiva Élite', amount: 120 },
      { id: 'f2-6', date: '2026-05-22', clientName: 'Patricia Alba', concept: 'Suscripción Mensual Readaptación', amount: 300 },
      { id: 'f2-7', date: '2026-05-28', clientName: 'Bloom Fitness SL', concept: 'Facturación Sesiones Convenio', amount: 1000 }
    ]
  },
  {
    id: 'fisio-3',
    role: 'fisio',
    name: 'Fisio - Alta Facturación',
    totalGrossIncome: 3880,
    description: 'Facturación superior a 3.000€ (Tramo máximo del 80%)',
    services: [
      { id: 'f3-1', date: '2026-05-03', clientName: 'Ana Belén Solis', concept: 'Tratamiento Fisio Integrativa Pack', amount: 550 },
      { id: 'f3-2', date: '2026-05-06', clientName: 'Sergio Castellví', concept: 'Tratamiento Fisioterapia Deportiva', amount: 65 },
      { id: 'f3-3', date: '2026-05-08', clientName: 'Empresa Externa A', concept: 'Convenio de Salud Corporativa', amount: 1200 },
      { id: 'f3-4', date: '2026-05-12', clientName: 'Victoria Cruz', concept: 'Fisioterapia Suelo Pélvico', amount: 75 },
      { id: 'f3-5', date: '2026-05-17', clientName: 'Carlos Gómez', concept: 'Bono Fisioterapias Continuas', amount: 390 },
      { id: 'f3-6', date: '2026-05-20', clientName: 'Beatriz Luque', concept: 'Sesión Osteopatía Estructural', amount: 90 },
      { id: 'f3-7', date: '2026-05-25', clientName: 'Marcos Alonso', concept: 'Plan de Readaptación Lesiones (3 meses)', amount: 1510 }
    ]
  },
  {
    id: 'nutri-1',
    role: 'nutri',
    name: 'Nutri - Actividad Inicial',
    totalGrossIncome: 375,
    description: 'Facturación por debajo de 500€ (Tramo del 70%)',
    services: [
      { id: 'n1-1', date: '2026-05-05', clientName: 'Pedro Miralles', concept: 'Consulta Inicial Nutrición + Bioimpedancia', amount: 75 },
      { id: 'n1-2', date: '2026-05-11', clientName: 'Sonia Garrido', concept: 'Seguimiento Quincenal', amount: 45 },
      { id: 'n1-3', date: '2026-05-15', clientName: 'Leticia López', concept: 'Plan de Nutrición Personalizado 1 Mes', amount: 120 },
      { id: 'n1-4', date: '2026-05-19', clientName: 'Mario Esteller', concept: 'Seguimiento Nutricional', amount: 45 },
      { id: 'n1-5', date: '2026-05-26', clientName: 'Eva Sanz', concept: 'Asesoría y Lista de la compra guiada', amount: 90 }
    ]
  },
  {
    id: 'nutri-2',
    role: 'nutri',
    name: 'Nutri - Actividad Media',
    totalGrossIncome: 795,
    description: 'Facturación entre 500€ y 1.000€ (Tramo del 75%)',
    services: [
      { id: 'n2-1', date: '2026-05-02', clientName: 'Tomás Barberá', concept: 'Pack Nutrición Deportiva Trimestral', amount: 280 },
      { id: 'n2-2', date: '2026-05-09', clientName: 'Paula Vila', concept: 'Consulta Nutricional Inicial', amount: 75 },
      { id: 'n2-3', date: '2026-05-13', clientName: 'Víctor Herrero', concept: 'Seguimiento Nutricional Extra', amount: 45 },
      { id: 'n2-4', date: '2026-05-16', clientName: 'Nuria Beltrán', concept: 'Bono Continuidad Nutricional (5 ses)', amount: 195 },
      { id: 'n2-5', date: '2026-05-20', clientName: 'Alejandro Ibáñez', concept: 'Consulta Pérdida de Peso Inicial', amount: 80 },
      { id: 'n2-6', date: '2026-05-27', clientName: 'Marisa Beltrán', concept: 'Sesiones de Coaching Nutricional (2x)', amount: 120 }
    ]
  },
  {
    id: 'nutri-3',
    role: 'nutri',
    name: 'Nutri - Alta Facturación',
    totalGrossIncome: 1390,
    description: 'Facturación superior a 1.000€ (Tramo máximo del 80%)',
    services: [
      { id: 'n3-1', date: '2026-05-04', clientName: 'Gimnasio Bloom', concept: 'Asesoría Nutricional Clientes Premium (Fijo)', amount: 600 },
      { id: 'n3-2', date: '2026-05-08', clientName: 'David Ferrero', concept: 'Plan de Nutrición Competición Anual', amount: 480 },
      { id: 'n3-3', date: '2026-05-12', clientName: 'Isabel Giner', concept: 'Consulta Inicial Nutrición Clínica', amount: 85 },
      { id: 'n3-4', date: '2026-05-18', clientName: 'Jordi Albiol', concept: 'Pack Recomposición Corporal', amount: 135 },
      { id: 'n3-5', date: '2026-05-25', clientName: 'Raquel Mas', concept: 'Sesión de Seguimiento + Antropometría', amount: 90 }
    ]
  }
];
