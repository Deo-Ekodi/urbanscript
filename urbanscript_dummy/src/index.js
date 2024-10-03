import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const formContainer = document.getElementById('formContainer');
const root = ReactDOM.createRoot(formContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
