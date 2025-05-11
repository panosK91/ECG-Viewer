import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo
} from 'react';
import ecgDto from '../data/ecg_graph_dto_realistic.json';
import { Annotation, SignalPoint, Label } from '../types';

interface ContextValue {
  signals: SignalPoint[];
  annotations: Annotation[];
  filters: Label[];                // which labels to SHOW
  setFilters: (f: Label[]) => void;
  updateLabel: (id: number, label: Label) => void;
  batchUpdate: (ids: number[], label: Label) => void;
}

const AnnotationsContext = createContext<ContextValue | undefined>(undefined);

export const AnnotationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const signals = ecgDto.signals as SignalPoint[];
  const initialAnn = (ecgDto.beats as { beatIndex: number; label: Label }[]).map(
    (b, i) => ({ id: i, beatIndex: b.beatIndex, label: b.label })
  );

  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnn);
  const [filters, setFilters] = useState<Label[]>(['N','V','S','A']);

  const updateLabel = (id: number, label: Label) => {
    setAnnotations(a => a.map(x => x.id===id ? {...x, label} : x));
  };

  const batchUpdate = (ids: number[], label: Label) => {
    setAnnotations(a => a.map(x => ids.includes(x.id) ? {...x, label} : x));
  };

  const value = useMemo(() => ({
    signals, annotations, filters, setFilters, updateLabel, batchUpdate
  }), [signals, annotations, filters]);

  return (
    <AnnotationsContext.Provider value={value}>
      {children}
    </AnnotationsContext.Provider>
  );
};

export const useAnnotations = () => {
  const ctx = useContext(AnnotationsContext);
  if (!ctx) throw new Error('Must be in AnnotationsProvider');
  return ctx;
};
