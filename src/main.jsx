// Punto de entrada: aquí React se engancha al div #root del index.html
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { InicioPage } from './pages/InicioPage';
import { PaginaPokedex } from './pages/PaginaPokedex';
import { AppProviders } from './app/providers/AppProviders';
import '../estilos.css';
import '../inicio.css';

function App() {
  return (
    // El provider tiene que ir por fuera del router para que el estado llegue a todas las rutas
    <AppProviders>
      {/* HashRouter: la ruta va en #/... y así no pelea con Vite al recargar */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/pokedex" element={<PaginaPokedex />} />
          {/* Cualquier URL rara manda al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProviders>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
