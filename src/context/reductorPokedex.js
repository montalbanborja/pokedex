// Todas las "piezas" del estado en un sitio; así sé qué existe aunque aún no haya cargado nada
export const initialPokedexState = {
  route: { mode: null, gameId: null, gen: null },
  loading: false,
  loadingMessage: '',
  error: '',
  search: '',
  ui: {
    filterPanelOpen: false,
    modalPokemonName: null,
    toast: '',
  },
  filters: {
    tipos: [],
    generaciones: [],
    etapas: [],
    categorias: [],
    versiones: [],
  },
  team: [],
  theme: 'dark',
  data: {
    game: null,
    pokemonPrincipal: [],
    seccionesDlc: [],
    todosPokemon: [],
    pokemonRegional: [],
    todasFormasEspeciales: [],
    pokemonByName: {},
  },
};

// Patrón típico de chips: si ya está, lo quito; si no, lo meto
function alternarEnLista(list, value) {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

export function pokedexReducer(state, action) {
  switch (action.type) {
    case 'SET_ROUTE':
      return { ...state, route: action.payload };
    case 'LOAD_START':
      return { ...state, loading: true, loadingMessage: action.payload || 'Cargando Pokédex…', error: '' };
    case 'LOAD_PARTIAL':
      // Permite pintar datos parciales mientras siguen llegando peticiones.
      return {
        ...state,
        loading: true,
        loadingMessage: action.payload.loadingMessage || state.loadingMessage,
        data: {
          ...state.data,
          ...action.payload.data,
          pokemonByName: {
            ...state.data.pokemonByName,
            ...(action.payload.data?.pokemonByName || {}),
          },
        },
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, loadingMessage: '', error: action.payload || 'Error cargando datos.' };
    case 'LOAD_SUCCESS':
      // Sustituyo data entera: en éxito ya viene el objeto final armado desde pokeApi
      return { ...state, loading: false, loadingMessage: '', error: '', data: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'TOGGLE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: alternarEnLista(state.filters[action.payload.key], action.payload.value),
        },
      };
    case 'RESET_FILTERS':
      return { ...state, filters: initialPokedexState.filters };
    case 'TOGGLE_FILTER_PANEL':
      return { ...state, ui: { ...state.ui, filterPanelOpen: !state.ui.filterPanelOpen } };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      // Alterno entre dos strings fijos porque mi CSS solo contempla dark/light
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_TEAM':
      // Lo usa la persistencia al leer JSON del localStorage (reemplaza el array entero)
      return { ...state, team: action.payload };
    case 'TOGGLE_TEAM': {
      // Limito el equipo a 6 para mantener la regla clásica de Pokémon.
      const exists = state.team.some(p => p.name === action.payload.name);
      let team = state.team;
      let toast = '';
      if (exists) {
        team = state.team.filter(p => p.name !== action.payload.name);
        toast = `${action.payload.label} eliminado del equipo`;
      } else if (state.team.length < 6) {
        team = [...state.team, action.payload];
        toast = `${action.payload.label} añadido`;
      } else {
        toast = '¡Equipo lleno!';
      }
      return { ...state, team, ui: { ...state.ui, toast } };
    }
    case 'CLEAR_TEAM':
      return { ...state, team: [], ui: { ...state.ui, toast: 'Equipo limpiado' } };
    case 'OPEN_MODAL':
      // Guardo el nombre "interno" (slug) porque pokemonByName está indexado así
      return { ...state, ui: { ...state.ui, modalPokemonName: action.payload } };
    case 'CLOSE_MODAL':
      return { ...state, ui: { ...state.ui, modalPokemonName: null } };
    case 'CLEAR_TOAST':
      // Limpio aviso temporal para que no se quede fijo en pantalla.
      return { ...state, ui: { ...state.ui, toast: '' } };
    default:
      return state;
  }
}
