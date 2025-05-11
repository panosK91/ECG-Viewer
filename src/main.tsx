import React from 'react';
import { createRoot } from 'react-dom/client';
import { AnnotationsProvider } from './context/AnnotationsContext';
import App from './App';
import './App.css';

const container = document.getElementById('root')!;
createRoot(container).render(
  <AnnotationsProvider>
    <App />
  </AnnotationsProvider>
);
