import React, { useEffect, useRef } from 'react';
import { useAnnotations } from '../context/AnnotationsContext';
import { Annotation } from '../types';

interface Props {
  editingId: number | null;
  onClose: () => void;
}

export const AnnotationEditor: React.FC<Props> = ({ editingId, onClose }) => {
  const { annotations, updateLabel } = useAnnotations();
  const ann = annotations.find((a) => a.id === editingId);
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [editingId]);

  if (!ann) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLabel(ann.id, e.target.value as Annotation['label']);
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="editor-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-label"
    >
      <label id="editor-label" htmlFor="labelSelect">
        Edit Beat #{ann.id} Label:
      </label>
      <select
        id="labelSelect"
        ref={ref}
        value={ann.label}
        onChange={handleChange}
        onKeyDown={handleKey}
      >
        <option value="N">N (Normal)</option>
        <option value="V">V (Ventricular)</option>
        <option value="S">S (Supraventricular)</option>
        <option value="A">A (Artifact)</option>
      </select>
      <button onClick={onClose} aria-label="Close editor">
        ×
      </button>
    </div>
  );
};
