import React from 'react';
import { useAnnotations } from '../context/AnnotationsContext';
import { Label } from '../types';

export const FilterBar: React.FC = () => {
  const { filters, setFilters } = useAnnotations();
  const all: Label[] = ['N','V','S','A'];

  const toggle = (l: Label) => {
    setFilters(filters.includes(l)
      ? filters.filter(x=>x!==l)
      : [...filters, l]);
  };

  return (
    <div className="filter-bar">
      <strong>Show:</strong>
      {all.map(l => (
        <label key={l}>
          <input
            type="checkbox"
            checked={filters.includes(l)}
            onChange={()=>toggle(l)}
          /> {l}
        </label>
      ))}
    </div>
  );
};
