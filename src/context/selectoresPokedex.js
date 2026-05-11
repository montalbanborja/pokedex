// Funciones "puras": no tocan el estado, solo devuelven lo que hay que pintar (más fácil de seguir)
import { FORMAS_REGIONALES, RANGOS_GEN } from '../../datos-juegos';

export function formatearNombre(name) {
  // Normalizo nombres especiales para mostrarlos más legibles.
  if (!name) return '';
  if (name.endsWith('-gmax')) return `${formatearNombre(name.replace('-gmax', ''))} (Gigamax)`;
  if (name.includes('-mega-x')) return `${formatearNombre(name.replace('-mega-x', ''))} Mega X`;
  if (name.includes('-mega-y')) return `${formatearNombre(name.replace('-mega-y', ''))} Mega Y`;
  if (name.endsWith('-mega')) return `Mega ${formatearNombre(name.replace('-mega', ''))}`;
  return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

// Quito sufijos para encontrar la especie "normal" en el mapa (filtros, exclusivas, etc.)
export function obtenerNombreFormaBase(name) {
  return name
    .replace(/-mega-[xyz]$/, '')
    .replace(/-mega-z$/, '')
    .replace(/-eternal-mega$/, '')
    .replace(/-gmax$/, '')
    .replace(/-mega$/, '')
    .replace(/-(alola|galar|hisui|paldea)$/, '');
}

// Categoría = lo que viene de la API (legendary/mythical) más flags mega/gmax que yo marco al construir el objeto
function categoryPasses(p, categorias) {
  if (!categorias.length) return true;
  if (p.isMega) return categorias.includes('mega');
  if (p.isGmax) return categorias.includes('gmax');
  return categorias.includes(p.category || 'normal');
}

// Un Pokémon entra en la lista visible solo si pasa todos los filtros activos a la vez
function passesFilters(p, state, evoStages) {
  if (!p) return false;
  const { search, filters, data } = state;
  const base = data.pokemonByName[obtenerNombreFormaBase(p.name)] || p;
  if (search && !p.name.includes(search) && !String(p.id).startsWith(search)) return false;
  if (filters.tipos.length && !p.types.some(t => filters.tipos.includes(t))) return false;
  if (filters.generaciones.length && !filters.generaciones.includes(base.gen)) return false;
  if (!categoryPasses(p, filters.categorias)) return false;
  if (filters.etapas.length) {
    // -1 = aún no sé la etapa (cadena sin cargar); 0 = sin evolucionar según mi lógica
    const stage = evoStages[base.name] ?? (base.evoChainUrl ? -1 : 0);
    if (!filters.etapas.includes(stage)) return false;
  }
  if (filters.versiones.length && state.data.game?.versionExclusives?.length) {
    // Acepto si entra por exclusiva o por filtro alternativo (vf:).
    const matchesExclusive = state.data.game.versionExclusives.some(v => {
      if (!filters.versiones.includes(v.id)) return false;
      return v.pokemon.includes(base.name);
    });
    const matchesAlt = (state.data.game.versionFilters || []).some(v => {
      if (!filters.versiones.includes(`vf:${v.id}`)) return false;
      return !v.pokemon?.length || v.pokemon.includes(base.name);
    });
    if (!matchesExclusive && !matchesAlt) return false;
  }
  return true;
}

// Modo con juego: lista principal + DLC; las formas raras las engancho debajo de su base si pasan filtro
function sectionsFromGameData(state, evoStages) {
  const { game, pokemonPrincipal, seccionesDlc, pokemonByName } = state.data;
  const specialsByBase = {};
  Object.values(pokemonByName).forEach(p => {
    if (p.isMega || p.isGmax || FORMAS_REGIONALES.includes(p.name)) {
      const base = obtenerNombreFormaBase(p.name);
      specialsByBase[base] = specialsByBase[base] || [];
      specialsByBase[base].push(p);
    }
  });
  const build = entries => {
    const list = [];
    entries.forEach(entry => {
      const base = pokemonByName[entry.species];
      if (passesFilters(base, state, evoStages)) list.push(base);
      (specialsByBase[entry.species] || []).forEach(s => {
        if (passesFilters(s, state, evoStages)) list.push(s);
      });
    });
    return list;
  };
  const sections = [];
  const main = build(pokemonPrincipal);
  if (main.length) sections.push({ title: game.name, subtitle: `Pokédex regional · ${main.length} entradas`, list: main });
  seccionesDlc.forEach(d => {
    const list = build(d.entries);
    if (list.length) sections.push({ title: `DLC — ${d.title}`, subtitle: `Contenido descargable · ${list.length} entradas`, list });
  });
  return sections;
}

// Modo global: agrupo por generación (o pestaña regional) usando el número de dex nacional
function sectionsFromAllData(state, evoStages) {
  const activeGen = state.route.gen || 'all';
  const byGen = {};
  const pool = Object.values(state.data.pokemonByName).sort((a, b) => a.id - b.id);
  pool.forEach(p => {
    if (!passesFilters(p, state, evoStages)) return;
    const key = p.isRegional ? 'regional' : p.gen;
    if (activeGen !== 'all' && activeGen !== 'regional' && Number(activeGen) !== key) return;
    if (activeGen === 'regional' && key !== 'regional') return;
    byGen[key] = byGen[key] || [];
    byGen[key].push(p);
  });
  const keys = activeGen === 'all' ? [...Object.keys(RANGOS_GEN).map(Number), 'regional'] : [activeGen === 'regional' ? 'regional' : Number(activeGen)];
  return keys.flatMap(key => {
    const list = byGen[key];
    if (!list?.length) return [];
    const info = key === 'regional' ? { name: 'Formas Regionales', region: 'Alola · Galar · Hisui · Paldea' } : RANGOS_GEN[key];
    return [{ title: info.name, subtitle: info.region, list }];
  });
}

export function seleccionarSecciones(state, evoStages) {
  // Si hay juego seleccionado, mostramos modo juego + DLC; si no, modo global.
  if (state.data.game) return sectionsFromGameData(state, evoStages);
  return sectionsFromAllData(state, evoStages);
}

export function seleccionarPokemonModal(state) {
  if (!state.ui.modalPokemonName) return null;
  // Busco en el mapa por nombre exacto (incluye formas tipo charizard-mega-x)
  return state.data.pokemonByName[state.ui.modalPokemonName] || null;
}
