// Context = comparto state + dispatch sin pasar props a mano por todo el árbol
import { createContext, useContext, useMemo, useReducer } from 'react';
import { initialPokedexState, pokedexReducer } from './reductorPokedex';

const PokedexContext = createContext(null);

export function PokedexProvider({ children }) {
  // useReducer me gusta aquí porque hay muchas acciones y no quiero mil useState sueltos
  const [state, dispatch] = useReducer(pokedexReducer, initialPokedexState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>;
}

export function usePokedexContext() {
  const ctx = useContext(PokedexContext);
  // Si me olvido del Provider, mejor que pete claro que un undefined raro
  if (!ctx) throw new Error('usePokedexContext debe usarse dentro de PokedexProvider');
  return ctx;
}
