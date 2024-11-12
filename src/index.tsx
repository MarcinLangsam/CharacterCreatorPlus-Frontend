import { createRoot } from "react-dom/client";
import './styles/global.css'
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CharacterProvider } from './context/CharacterContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </React.StrictMode>
);