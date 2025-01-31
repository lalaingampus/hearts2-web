import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router> {/* Wrap App with BrowserRouter here */}
      <App />
    </Router>
  </React.StrictMode>,
);
