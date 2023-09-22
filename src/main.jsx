import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from './context/image-api.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <App />
      </ImageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
