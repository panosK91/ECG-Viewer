import React, { useRef, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  Brush
} from 'recharts';
import { useAnnotations } from '../context/AnnotationsContext';
import { useContainerWidth } from '../hooks/useWindowSize';

interface Props {
  onDotClick: (id: number) => void;
  onBrushChange?: (range: [number, number]) => void;
}

export const ECGChart: React.FC<Props> = React.memo(
  ({ onDotClick, onBrushChange }) => {
    const { signals, annotations, filters } = useAnnotations();

    const containerRef = useRef<HTMLDivElement>(null);
    const width = useContainerWidth(containerRef);
    const chartWidth = Math.max(300, width * 0.98);

    // Only render annotations whose label is in the active filters
    const visibleAnnotations = useMemo(
      () => annotations.filter((a) => filters.includes(a.label)),
      [annotations, filters]
    );

    const dots = useMemo(
      () =>
        visibleAnnotations.map((ann) => {
          const pt = signals[ann.beatIndex];
          return (
            <ReferenceDot
              key={ann.id}
              x={pt.timeInMs}
              y={pt.point}
              r={5}
              stroke="#e74c3c"
              fill="#fff"
              onClick={() => onDotClick(ann.id)}
              aria-label={`Beat ${ann.id}, label ${ann.label}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onDotClick(ann.id)}
            />
          );
        }),
      [visibleAnnotations, signals, onDotClick]
    );

    return (
      <div ref={containerRef}>
        <LineChart
          width={chartWidth}
          height={350}
          data={signals}
          margin={{ top: 20, right: 20, left: 0, bottom: 60 }}  // increased bottom
        >
          <XAxis dataKey="timeInMs" label={{ value: 'Time (ms)', position: 'insideBottom' }} />
          <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="point"
            dot={false}
            stroke="#2c3e50"
            isAnimationActive={false}
          />
          {dots}
          <Brush
            dataKey="timeInMs"
            height={30}
            stroke="#34495e"
            onChange={(e) => {
              if (
                onBrushChange &&
                typeof (e as any).startIndex === 'number' &&
                typeof (e as any).endIndex === 'number'
              ) {
                onBrushChange([(e as any).startIndex, (e as any).endIndex]);
              }
            }}
          />
        </LineChart>
      </div>
    );
  }
);