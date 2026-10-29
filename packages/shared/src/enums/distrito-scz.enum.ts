export const DistritoMunicipalSCZ = {
  DM_1: 'DM-1',
  DM_2: 'DM-2',
  DM_3: 'DM-3',
  DM_4: 'DM-4',
  DM_5: 'DM-5',
  DM_6: 'DM-6',
  DM_7: 'DM-7',
  DM_8: 'DM-8',
  DM_9: 'DM-9',
  DM_10: 'DM-10',
  DM_11: 'DM-11',
  DM_12: 'DM-12',
  DM_13: 'DM-13',
  DM_14: 'DM-14',
  DM_15: 'DM-15',
  DM_16: 'DM-16',
} as const;

export type DistritoMunicipalSCZ =
  (typeof DistritoMunicipalSCZ)[keyof typeof DistritoMunicipalSCZ];
