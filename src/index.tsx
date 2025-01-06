import { createRoot } from "react-dom/client";
import './style.css'
import App from './/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CharacterProvider } from './context/CharacterContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  //</React.StrictMode>
);