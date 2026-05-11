import { PokedexProvider } from '../../context/PokedexContext';
import { usePokedexContext } from '../../context/PokedexContext';
import { useEstadoPersistente } from '../../hooks/useEstadoPersistente';

// Lo pongo aquí porque el hook necesita el contexto ya creado y quiero que corra en inicio Y en pokédex
function PersistenciaGlobal({ children }) {
  const { state, dispatch } = usePokedexContext();
  useEstadoPersistente(state, dispatch);
  return children;
}

export function AppProviders({ children }) {
  return (
    <PokedexProvider>
      <PersistenciaGlobal>{children}</PersistenciaGlobal>
    </PokedexProvider>
  );
}
