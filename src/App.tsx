import React, { useState } from 'react';
import { ECGChart } from './components/ECGChart';
import { AnnotationEditor } from './components/AnnotationEditor';
import { StatsPanel } from './components/StatsPanel';
import { FilterBar } from './components/FilterBar';
import { EventsWindow } from './components/EventsWindow';
import { LorenzPlot } from './components/LorenzPlot';
import './App.css';

const App: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewRange, setViewRange] = useState<[number,number]>();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ECG Signal Viewer</h1>
      </header>

      {/* Two-column layout: main + sidebar */}
      <div className="layout">
        {/* Main area */}
        <main className="main-content">
          <div className="card">
            <FilterBar />
          </div>

          <div className="card chart-card">
            <ECGChart
              onDotClick={id => setEditingId(id)}
              onBrushChange={r => setViewRange(r)}
            />
            <StatsPanel viewRange={viewRange} />
          </div>

          <div className="card lorenz-card">
            <h2>Poincaré (Lorenz) Plot</h2>
            <LorenzPlot />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <EventsWindow />
        </aside>
      </div>

      {editingId !== null && (
        <AnnotationEditor
          editingId={editingId}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
};

export default App;
