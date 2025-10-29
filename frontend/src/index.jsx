/**
 * React Entry Point
 * File Location: src/index.jsx
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/index.jsx
 * 
 * Entry point for React application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
