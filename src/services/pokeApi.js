// Capa de acceso a PokeAPI + montaje de objetos que usa la app (sprite, tipos, flags, etc.)
// Lo separé de los componentes para no mezclar fetch con JSX
import { FORMAS_REGIONALES, JUEGOS, RANGOS_GEN } from '../../datos-juegos';

const cachePokemon = {};
const cacheFormas = {};
const cacheEspecies = {};

function getGenById(id) {
  for (const [g, { min, max }] of Object.entries(RANGOS_GEN)) {
    if (id >= min && id <= max) return Number(g);
  }
  return null;
}

async function fetchJson(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

async function fetchPokemon(speciesName) {
  if (cachePokemon[speciesName]) return cachePokemon[speciesName];
  try {
    const spec = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}/`);
    const poke = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${speciesName}/`);
    cacheEspecies[speciesName] = {
      isLegendary: spec.is_legendary,
      isMythical: spec.is_mythical,
      evoChainUrl: spec.evolution_chain?.url || null,
    };
    const built = {
      id: spec.id,
      name: speciesName,
      types: poke.types.map(t => t.type.name),
      sprite: poke.sprites?.other?.['official-artwork']?.front_default || poke.sprites?.front_default || '',
      stats: poke.stats,
      height: poke.height,
      weight: poke.weight,
      gen: getGenById(spec.id),
      isRegional: FORMAS_REGIONALES.includes(speciesName),
      category: spec.is_mythical ? 'mythical' : spec.is_legendary ? 'legendary' : 'normal',
      evoChainUrl: spec.evolution_chain?.url || null,
    };
    cachePokemon[speciesName] = built;
    return built;
  } catch {
    return null;
  }
}

async function fetchSpecialForm(name) {
  if (cacheFormas[name]) return cacheFormas[name];
  try {
    const poke = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const isMega = name.includes('-mega');
    const isGmax = name.includes('-gmax');
    const isRegional = FORMAS_REGIONALES.includes(name);
    const baseName = poke.species?.name || name.split('-')[0];
    if (!cacheEspecies[baseName]) {
      try {
        const spec = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${baseName}/`);
        cacheEspecies[baseName] = {
          isLegendary: spec.is_legendary,
          isMythical: spec.is_mythical,
          evoChainUrl: spec.evolution_chain?.url || null,
        };
      } catch {}
    }
    const sc = cacheEspecies[baseName];
    const built = {
      id: poke.id,
      name,
      types: poke.types.map(t => t.type.name),
      sprite: poke.sprites?.other?.['official-artwork']?.front_default || poke.sprites?.front_default || '',
      stats: poke.stats,
      height: poke.height,
      weight: poke.weight,
      gen: getGenById(poke.id) || cachePokemon[baseName]?.gen || null,
      isRegional,
      isMega,
      isGmax,
      category: isMega ? 'mega' : isGmax ? 'gmax' : sc?.isMythical ? 'mythical' : sc?.isLegendary ? 'legendary' : 'normal',
      evoChainUrl: null,
    };
    cacheFormas[name] = built;
    return built;
  } catch {
    return null;
  }
}

async function getDexEntries(names = []) {
  const all = [];
  const seen = new Set();
  for (const dexName of names) {
    try {
      const data = await fetchJson(`https://pokeapi.co/api/v2/pokedex/${dexName}/`);
      for (const entry of data.pokemon_entries) {
        const species = entry.pokemon_species.name;
        if (!seen.has(species)) {
          seen.add(species);
          all.push({ entryNum: entry.entry_number, species });
        }
      }
    } catch {
      // Ignorar pokedex no disponible en la API.
    }
  }
  return all;
}

async function processInBatches(items, batchSize, runner, onProgress) {
  let completed = 0;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(runner));
    completed += batch.length;
    if (onProgress) onProgress({ completed, total: items.length, results });
  }
}

export async function loadGameData(game, options = {}) {
  const { onProgress } = options;
  const pokemonByName = {};
  const principal = game.staticPokedex?.length
    ? game.staticPokedex.map((species, i) => ({ entryNum: i + 1, species }))
    : await getDexEntries(game.pokedexes || []);
  const seccionesDlc = [];
  if (game.staticDlcPokedex?.length) {
    seccionesDlc.push({
      title: game.dlcNames?.[0] || 'DLC',
      entries: game.staticDlcPokedex.map((species, i) => ({ entryNum: i + 1, species })),
    });
  } else {
    for (let i = 0; i < (game.dlcPokedexes || []).length; i++) {
      seccionesDlc.push({
        title: game.dlcNames?.[i] || game.dlcPokedexes[i],
        entries: await getDexEntries([game.dlcPokedexes[i]]),
      });
    }
  }
  const species = [...new Set([
    ...principal.map(e => e.species),
    ...seccionesDlc.flatMap(d => d.entries.map(e => e.species)),
  ])];
  onProgress?.({
    stage: 'meta',
    data: {
      game,
      pokemonPrincipal: principal,
      seccionesDlc,
      todosPokemon: [],
      pokemonRegional: [],
      todasFormasEspeciales: [],
      pokemonByName: {},
    },
    loadingMessage: `Cargando datos… 0 / ${species.length}`,
  });
  await processInBatches(
    species,
    16,
    fetchPokemon,
    ({ completed, total, results }) => {
      results.filter(Boolean).forEach(p => {
        pokemonByName[p.name] = p;
      });
      onProgress?.({
        stage: 'species',
        data: {
          game,
          pokemonPrincipal: principal,
          seccionesDlc,
          todosPokemon: [],
          pokemonRegional: [],
          todasFormasEspeciales: [],
          pokemonByName: { ...pokemonByName },
        },
        loadingMessage: `Cargando datos… ${completed} / ${total}`,
      });
    },
  );
  const REGIONAL_SUFFIX_GAMES = {
    alola: g => g.gen === 7,
    galar: g => g.id === 'sword-shield',
    hisui: g => g.id === 'legends-arceus',
    paldea: g => g.gen === 9,
  };

  const isRegionalValidForGame = regionalName => {
    const base = regionalName.split('-')[0];
    const suffix = regionalName.slice(base.length + 1).split('-')[0];
    const predicate = REGIONAL_SUFFIX_GAMES[suffix];
    return predicate ? predicate(game) : false;
  };

  const specials = [...new Set([
    ...(game.megaForms || []),
    ...(game.gigantamaxForms || []),
    ...(game.dlcMegaForms || []),
    ...FORMAS_REGIONALES.filter(r => species.some(s => r.startsWith(`${s}-`)) && isRegionalValidForGame(r)),
  ])];
  await processInBatches(
    specials,
    12,
    fetchSpecialForm,
    ({ completed, total, results }) => {
      results.filter(Boolean).forEach(p => {
        pokemonByName[p.name] = p;
      });
      onProgress?.({
        stage: 'specials',
        data: {
          game,
          pokemonPrincipal: principal,
          seccionesDlc,
          todosPokemon: [],
          pokemonRegional: [],
          todasFormasEspeciales: [],
          pokemonByName: { ...pokemonByName },
        },
        loadingMessage: `Cargando formas… ${completed} / ${total}`,
      });
    },
  );
  return {
    game,
    pokemonPrincipal: principal,
    seccionesDlc,
    todosPokemon: [],
    pokemonRegional: [],
    todasFormasEspeciales: [],
    pokemonByName,
  };
}

export async function loadAllData(options = {}) {
  const { onProgress } = options;
  const pokemonByName = {};
  const data = await fetchJson('https://pokeapi.co/api/v2/pokedex/national/');
  const species = new Set(data.pokemon_entries.map(e => e.pokemon_species.name));
  JUEGOS.forEach(game => {
    (game.staticPokedex || []).forEach(n => species.add(n));
    (game.staticDlcPokedex || []).forEach(n => species.add(n));
  });
  onProgress?.({
    stage: 'meta',
    data: {
      game: null,
      pokemonPrincipal: [],
      seccionesDlc: [],
      todosPokemon: [],
      pokemonRegional: [],
      todasFormasEspeciales: [],
      pokemonByName: {},
    },
    loadingMessage: `Cargando nacional… 0 / ${species.size}`,
  });
  await processInBatches(
    [...species],
    20,
    fetchPokemon,
    ({ completed, total, results }) => {
      results.filter(Boolean).forEach(p => {
        pokemonByName[p.name] = p;
      });
      onProgress?.({
        stage: 'species',
        data: {
          game: null,
          pokemonPrincipal: [],
          seccionesDlc: [],
          todosPokemon: Object.values(pokemonByName).filter(p => !p.isRegional && !p.isMega && !p.isGmax),
          pokemonRegional: Object.values(pokemonByName).filter(p => p.isRegional),
          todasFormasEspeciales: Object.values(pokemonByName).filter(p => p.isMega || p.isGmax),
          pokemonByName: { ...pokemonByName },
        },
        loadingMessage: `Cargando nacional… ${completed} / ${total}`,
      });
    },
  );
  const specials = new Set(FORMAS_REGIONALES);
  JUEGOS.forEach(game => {
    (game.megaForms || []).forEach(n => specials.add(n));
    (game.gigantamaxForms || []).forEach(n => specials.add(n));
    (game.dlcMegaForms || []).forEach(n => specials.add(n));
  });
  await processInBatches(
    [...specials],
    16,
    fetchSpecialForm,
    ({ completed, total, results }) => {
      results.filter(Boolean).forEach(p => {
        pokemonByName[p.name] = p;
      });
      onProgress?.({
        stage: 'specials',
        data: {
          game: null,
          pokemonPrincipal: [],
          seccionesDlc: [],
          todosPokemon: Object.values(pokemonByName).filter(p => !p.isRegional && !p.isMega && !p.isGmax),
          pokemonRegional: Object.values(pokemonByName).filter(p => p.isRegional),
          todasFormasEspeciales: Object.values(pokemonByName).filter(p => p.isMega || p.isGmax),
          pokemonByName: { ...pokemonByName },
        },
        loadingMessage: `Cargando formas… ${completed} / ${total}`,
      });
    },
  );
  return {
    game: null,
    pokemonPrincipal: [],
    seccionesDlc: [],
    todosPokemon: Object.values(pokemonByName).filter(p => !p.isRegional && !p.isMega && !p.isGmax),
    pokemonRegional: Object.values(pokemonByName).filter(p => p.isRegional),
    todasFormasEspeciales: Object.values(pokemonByName).filter(p => p.isMega || p.isGmax),
    pokemonByName,
  };
}

export async function fetchEvolutionChainStages(url) {
  const data = await fetchJson(url);
  const stages = {};
  const walk = (node, stage) => {
    stages[node.species.name] = stage;
    (node.evolves_to || []).forEach(child => walk(child, stage + 1));
  };
  walk(data.chain, 1);
  if (Object.keys(stages).length === 1) stages[data.chain.species.name] = 0;
  return stages;
}
