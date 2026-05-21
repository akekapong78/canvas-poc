export interface StageItem {
  type: 'extraction' | 'production' | 'packaging' | 'logistics';
  label: string;
  sublabel: string;
}

export const stageItems: StageItem[] = [
  { type: 'extraction', label: 'Extraction', sublabel: 'RAW MATERIALS' },
  { type: 'production', label: 'Processing', sublabel: 'MANUFACTURING' },
  { type: 'packaging', label: 'Packaging', sublabel: 'SECONDARY PROCESS' },
  { type: 'logistics', label: 'Logistics', sublabel: 'TRANSPORT' },
];
