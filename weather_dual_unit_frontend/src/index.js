import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import new components so that build tests (and IDE auto-import/hot reload w/ strict mode) pick up on file presence & type errors
import './WeatherDisplay';
import './LocationDropdown';
import './api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
