import React, { useState } from 'react';
import { useAnnotations } from '../context/AnnotationsContext';
import { Annotation, Label } from '../types';

export const EventsWindow: React.FC = () => {
  const { annotations, filters, batchUpdate } = useAnnotations();
  const [selection, setSelection] = useState<Set<number>>(new Set());
  const [batchLabel, setBatchLabel] = useState<Label>('N');

  // Only list events that pass the active filters
  const list = annotations.filter((a) => filters.includes(a.label));

  const toggle = (id: number) => {
    const s = new Set(selection);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelection(s);
  };

  const apply = () => {
    batchUpdate(Array.from(selection), batchLabel);
    setSelection(new Set());
  };

  return (
    <div className="events-window">
      <h3>Events</h3>
      <ul>
        {list.map((a: Annotation) => (
          <li key={a.id}>
            <input
              type="checkbox"
              checked={selection.has(a.id)}
              onChange={() => toggle(a.id)}
            />{' '}
            #{a.id} @ {a.beatIndex}ms — <strong>{a.label}</strong>
          </li>
        ))}
      </ul>
      <div className="batch-edit">
        <select
          value={batchLabel}
          onChange={(e) => setBatchLabel(e.target.value as Label)}
        >
          <option value="N">N</option>
          <option value="V">V</option>
          <option value="S">S</option>
          <option value="A">A</option>
        </select>
        <button onClick={apply} disabled={selection.size === 0}>
          Apply to Selected
        </button>
      </div>
    </div>
  );
};
