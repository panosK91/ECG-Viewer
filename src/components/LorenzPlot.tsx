import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';
import { useAnnotations } from '../context/AnnotationsContext';

export const LorenzPlot: React.FC = () => {
  const { annotations, signals } = useAnnotations();

  // build RR intervals in ms
  const data = useMemo(() => {
    const sorted = [...annotations].sort((a,b)=>signals[a.beatIndex].timeInMs - signals[b.beatIndex].timeInMs);
    const rr = sorted.map((a,i) => {
      if (i===0) return null;
      return {
        x:   signals[sorted[i-1].beatIndex].timeInMs,
        y:   signals[a.beatIndex].timeInMs,
        rrPrev: signals[a.beatIndex].timeInMs - signals[sorted[i-1].beatIndex].timeInMs
      };
    }).filter(v=>v);
    return rr as { x:number; y:number; rrPrev:number }[];
  }, [annotations, signals]);

  return (
    <ScatterChart width={300} height={300} margin={{ top:10, right:10, left:10, bottom:10 }}>
      <XAxis dataKey="x" name="RR[n]" unit="ms" />
      <YAxis dataKey="y" name="RR[n+1]" unit="ms" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  );
};
