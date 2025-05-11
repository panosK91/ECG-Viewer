# ECG Viewer

A single-page application for visualizing and annotating ECG signals.

## Features

- **ECG Waveform Display**
  Renders ECG signal over time using Recharts.

- **Beat Annotations**
  Visual markers for R-peaks, with interactive editing of labels (N, V, S, A).

- **Range Selection & Metrics**
  Select a time window via brush to compute duration and heart rate (bpm).

- **Filters**
  Toggle visibility of annotation types via a filter bar.

- **Events Window**
  Side panel listing annotations, supporting multi-select and batch label updates.

- **Lorenz (Poincaré) Plot**
  Scatter plot of consecutive RR intervals for heart-rate variability analysis.

---

## Project Structure

```
ecg-viewer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ECGChart.tsx
│   │   ├── AnnotationEditor.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── FilterBar.tsx
│   │   ├── EventsWindow.tsx
│   │   └── LorenzPlot.tsx
│   ├── context/
│   │   └── AnnotationsContext.tsx
│   ├── data/
│   │   └── ecg_graph_dto_realistic.json
│   ├── hooks/
│   │   └── useWindowSize.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js v16.x or newer
- npm v8.x or newer

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url> ecg-viewer
   cd ecg-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173` with hot-reload.


## Usage

- **Filter**: Use the checkboxes at the top to show/hide annotation types.
- **Edit Single Annotation**: Click (or press Enter on) any dot to open the editor and change its label.
- **Batch Edit**: In the side **Events** panel, select multiple annotations and apply a new label to all.
- **Range Selection**: Drag the brush below the chart to select a time window; see duration and heart rate in the Stats panel.
- **Lorenz Plot**: View RR[n] vs. RR[n+1] for heart-rate variability analysis.
