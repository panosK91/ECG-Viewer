export interface SignalPoint {
  timeInMs: number;
  point: number;
}

export type Label = 'N' | 'V' | 'S' | 'A';

export interface Annotation {
  id: number;
  beatIndex: number;
  label: Label;
}
