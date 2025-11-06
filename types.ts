export enum DenoiseLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum EnhancementMode {
  Auto = 'Auto',
  NightToDay = 'Night-to-Day',
  Portrait = 'Portrait',
  Landscape = 'Landscape',
}

export enum SuperResolution {
  OneX = '1x',
  TwoX = '2x',
  FourX = '4x',
}

export interface EnhancementSettings {
  brightness: number;
  denoiseLevel: DenoiseLevel;
  enhancementMode: EnhancementMode;
  superResolution: SuperResolution;
}
