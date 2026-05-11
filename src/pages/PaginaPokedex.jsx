// Pantalla "grande" de la pokédex: aquí solo ensamblo piezas; la lógica gorda está en hooks/reducer/selectores
import { useEffect, useMemo, useState } from 'react';
import { usePokedexContext } from '../context/PokedexContext';
import { useDatosPokedex } from '../hooks/useDatosPokedex';
import { fetchEvolutionChainStages } from '../services/pokeApi';
import { formatearNombre, seleccionarPokemonModal, seleccionarSecciones } from '../context/selectoresPokedex';
import { BarraEquipo, CabeceraPokedex, PanelFiltros, SeccionesPokedex } from '../components/pokedex/DisenoPokedex';
import { ModalPokemon } from '../components/pokedex/ModalPokemon';

export function PaginaPokedex() {
  const { state, dispatch } = usePokedexContext();
  // etapasEvo lo uso solo aquí: es un mapa nombre -> 0/1/2/3 para el filtro de evolución
  const [etapasEvo, setEtapasEvo] = useState({});
  useDatosPokedex(dispatch);

  useEffect(() => {
    // Saco cadenas de evolución únicas para no repetir llamadas.
    const urls = [...new Set(Object.values(state.data.pokemonByName).map(p => p.evoChainUrl).filter(Boolean))];
    let cancelled = false;

    Promise.all(urls.map(async url => fetchEvolutionChainStages(url)))
      .then(results => {
        if (cancelled) return;
        setEtapasEvo(results.reduce((acc, it) => ({ ...acc, ...it }), {}));
      })
      .catch(() => {});

    // Si cambio de juego rápido, no quiero que un fetch viejo mezcle datos
    return () => { cancelled = true; };
  }, [state.data.pokemonByName]);

  // useMemo para no recalcular secciones en cada render si no cambió nada importante
  const secciones = useMemo(() => seleccionarSecciones(state, etapasEvo), [state, etapasEvo]);
  const pokemonModal = useMemo(() => seleccionarPokemonModal(state), [state]);
  const totalFiltrosActivos = state.filters.tipos.length + state.filters.generaciones.length + state.filters.etapas.length + state.filters.categorias.length + state.filters.versiones.length;

  useEffect(() => {
    // El toast es un aviso corto; lo borro solo para no dejar texto colgado
    if (!state.ui.toast) return undefined;
    const id = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2200);
    return () => clearTimeout(id);
  }, [dispatch, state.ui.toast]);

  return (
    <div>
      <BarraEquipo
        team={state.team}
        theme={state.theme}
        onToggleTheme={() => dispatch({ type: 'TOGGLE_THEME' })}
        onClear={() => dispatch({ type: 'CLEAR_TEAM' })}
        onOpenModal={p => dispatch({ type: 'OPEN_MODAL', payload: p.name })}
        onToggleTeam={p => dispatch({ type: 'TOGGLE_TEAM', payload: { ...p, label: formatearNombre(p.name) } })}
      />
      {/* toLowerCase en búsqueda: la API usa nombres en minúsculas y así el includes funciona */}
      <CabeceraPokedex search={state.search} filtersCount={totalFiltrosActivos} onSearch={value => dispatch({ type: 'SET_SEARCH', payload: value.trim().toLowerCase() })} onToggleFilters={() => dispatch({ type: 'TOGGLE_FILTER_PANEL' })} />
      <PanelFiltros
        open={state.ui.filterPanelOpen}
        filters={state.filters}
        onToggleFilter={(key, value) => dispatch({ type: 'TOGGLE_FILTER', payload: { key, value } })}
        onReset={() => dispatch({ type: 'RESET_FILTERS' })}
      />
      <main className="main">
        {state.loading && <div className="loader"><p>{state.loadingMessage || 'Cargando Pokédex…'}</p></div>}
        {!!state.error && <div className="loader"><p style={{ color: 'var(--accent)' }}>{state.error}</p></div>}
        {/* Vacío puede ser "sin datos" o "filtros demasiado finos"; en ambos casos muestro el mismo mensaje simple */}
        {!state.error && secciones.length === 0 && !state.loading && <div className="no-results"><p>Sin resultados para esos filtros.</p></div>}
        {!state.error && secciones.length > 0 && <SeccionesPokedex sections={secciones} team={state.team} onToggleTeam={p => dispatch({ type: 'TOGGLE_TEAM', payload: { ...p, label: formatearNombre(p.name) } })} onOpenModal={p => dispatch({ type: 'OPEN_MODAL', payload: p.name })} />}
      </main>
      <ModalPokemon
        pokemon={pokemonModal}
        inTeam={!!pokemonModal && state.team.some(t => t.name === pokemonModal.name)}
        teamFull={state.team.length >= 6}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        onToggleTeam={p => dispatch({ type: 'TOGGLE_TEAM', payload: { ...p, label: formatearNombre(p.name) } })}
      />
      <div className={`toast${state.ui.toast ? ' show' : ''}`}>{state.ui.toast}</div>
    </div>
  );
}
