// localStorage = que no se pierda todo al recargar; sin backend es lo más sencillo que se me ocurrió
import { useEffect } from 'react';

function obtenerClaveStorageEquipo(route) {
  // Clave distinta por contexto: si no, al cambiar de juego pisaría el equipo del anterior
  if (route?.gameId) return `pdx-equipo-v4:game:${route.gameId}`;
  if (route?.mode === 'all') return 'pdx-equipo-v4:mode:all';
  if (route?.gen && route.gen !== 'all') return `pdx-equipo-v4:gen:${route.gen}`;
  return 'pdx-equipo-v4:default';
}

export function useEstadoPersistente(state, dispatch) {
  useEffect(() => {
    try {
      const temaGuardado = localStorage.getItem('pdx-theme');
      if (temaGuardado) dispatch({ type: 'SET_THEME', payload: temaGuardado === 'light' ? 'light' : 'dark' });
    } catch {}
    // Solo al montar: después el tema lo controla el reducer
  }, [dispatch]);

  const claveStorageEquipo = obtenerClaveStorageEquipo(state.route);

  useEffect(() => {
    try {
      // Guardo un equipo distinto según ruta (juego/modo/generación).
      const equipoGuardado = localStorage.getItem(claveStorageEquipo);
      dispatch({ type: 'SET_TEAM', payload: equipoGuardado ? JSON.parse(equipoGuardado) : [] });
    } catch {
      dispatch({ type: 'SET_TEAM', payload: [] });
    }
  }, [dispatch, claveStorageEquipo]);

  useEffect(() => {
    localStorage.setItem('pdx-theme', state.theme);
    // El CSS mira [data-theme] en el html, por eso toco documentElement y no un div suelto
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem(claveStorageEquipo, JSON.stringify(state.team));
  }, [state.team, claveStorageEquipo]);
}
