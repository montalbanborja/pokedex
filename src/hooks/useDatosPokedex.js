// Este hook es el que "entiende" la URL y dispara la carga correcta (juego vs modo todos)
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JUEGOS } from '../../datos-juegos';
import { loadAllData, loadGameData } from '../services/pokeApi';

function obtenerParametros(location) {
  // Con HashRouter a veces los params van en el hash (#/pokedex?game=...) y no en search
  const source = location.search || (location.hash.includes('?') ? location.hash.slice(location.hash.indexOf('?')) : '');
  return new URLSearchParams(source);
}

export function useDatosPokedex(dispatch) {
  const location = useLocation();

  useEffect(() => {
    // Sincronizo estado interno con los parámetros de la URL.
    const params = obtenerParametros(location);
    dispatch({
      type: 'SET_ROUTE',
      payload: {
        mode: params.get('mode'),
        gameId: params.get('game'),
        gen: params.get('gen') || 'all',
      },
    });
  }, [dispatch, location]);

  useEffect(() => {
    let cancelled = false;
    const params = obtenerParametros(location);
    const mode = params.get('mode');
    const gameId = params.get('game');
    const run = async () => {
      dispatch({ type: 'LOAD_START', payload: 'Cargando Pokédex…' });
      try {
        if (gameId) {
          const juego = JUEGOS.find(g => g.id === gameId || g.id === decodeURIComponent(gameId));
          if (!juego) throw new Error('No se encontró ese juego.');
          // onProgress va rellenando el estado poco a poco (útil porque hay muchas peticiones)
          const data = await loadGameData(juego, {
            onProgress: payload => {
              if (cancelled) return;
              dispatch({
                type: 'LOAD_PARTIAL',
                payload: {
                  data: payload.data,
                  loadingMessage: payload.loadingMessage,
                },
              });
            },
          });
          if (!cancelled) dispatch({ type: 'LOAD_SUCCESS', payload: data });
          return;
        }
        if (mode === 'all' || params.get('gen') || location.pathname.includes('/pokedex')) {
          // Este modo carga el catálogo completo para filtrar en cliente.
          const data = await loadAllData({
            onProgress: payload => {
              if (cancelled) return;
              dispatch({
                type: 'LOAD_PARTIAL',
                payload: {
                  data: payload.data,
                  loadingMessage: payload.loadingMessage,
                },
              });
            },
          });
          if (!cancelled) dispatch({ type: 'LOAD_SUCCESS', payload: data });
          return;
        }
      } catch (err) {
        if (!cancelled) dispatch({ type: 'LOAD_ERROR', payload: err.message });
      }
    };
    run();
    // Limpieza: si el usuario cambia de ruta antes de que termine, ignoro respuestas tardías
    return () => {
      cancelled = true;
    };
  }, [dispatch, location]);
}
