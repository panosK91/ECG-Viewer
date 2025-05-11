import React, { useMemo } from 'react';
import { useAnnotations } from '../context/AnnotationsContext';

interface Props {
  viewRange?: [number, number];
}

export const StatsPanel: React.FC<Props> = ({ viewRange }) => {
  const { annotations, signals } = useAnnotations();

  const bpm = useMemo(() => {
    if (!viewRange) return null;
    const [startIdx, endIdx] = viewRange;
    const startTime = signals[startIdx]?.timeInMs;
    const endTime = signals[endIdx]?.timeInMs;
    if (startTime == null || endTime == null) return null;

    const count = annotations.filter((a) => a.beatIndex >= startIdx && a.beatIndex <= endIdx).length;
    const minutes = (endTime - startTime) / 1000 / 60;
    return minutes > 0 ? Math.round(count / minutes) : null;
  }, [viewRange, annotations, signals]);

  if (bpm === null) return null;
  return (
    <div className="stats-panel">
      <strong>Heart Rate:</strong> {bpm} bpm
    </div>
  );
};
