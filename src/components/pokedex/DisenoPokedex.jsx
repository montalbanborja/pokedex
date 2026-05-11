// Trozos de UI de la pokédex; casi no tienen lógica, solo reciben props y llaman callbacks
import { Link } from 'react-router-dom';
import { GENERACIONES, TODOS_TIPOS, NOMBRES_TIPO } from '../../../datos-juegos';
import { TarjetaPokemon } from './TarjetaPokemon';

export function BarraEquipo({ team, onClear, onToggleTheme, onToggleTeam, onOpenModal, theme }) {
  return (
    <div className="team-bar">
      <div className="team-bar-inner">
        <div className="team-bar-left"><span className="team-bar-title">MI EQUIPO</span><span className="team-bar-count">{team.length} / 6</span></div>
        <div className="team-bar-slots">
          {Array.from({ length: 6 }).map((_, i) => {
            const p = team[i];
            return (
              <div key={i} className={`tbs${p ? ' filled' : ''}`} onClick={() => p && onOpenModal(p)}>
                {p ? (
                  <>
                    <img className="tbs-img" src={p.sprite} alt={p.name} />
                    <div className="tbs-tooltip">{p.label || p.name}</div>
                    <button
                      className="tbs-remove"
                      title="Quitar"
                      onClick={e => {
                        // Si no paro la propagación, el click también abriría el modal del slot
                        e.stopPropagation();
                        onToggleTeam(p);
                      }}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="tbs-num">{i + 1}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="team-bar-right">
          <Link className="btn-back" to="/">← Inicio</Link>
          <button className="btn-icon" onClick={onToggleTheme}><span className="theme-icon">{theme === 'dark' ? '☀' : '☾'}</span></button>
          <button className="btn-clear" onClick={onClear}>Limpiar</button>
        </div>
      </div>
    </div>
  );
}

// Cabecera controlada: el valor del input vive en el reducer (state.search)
export function CabeceraPokedex({ search, onSearch, onToggleFilters, filtersCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo"><h1>PokéDex</h1></div>
        <div className="header-search"><input className="search-input" type="search" placeholder="Buscar por nombre o número…" value={search} onChange={e => onSearch(e.target.value)} /></div>
        <div className="header-filters"><button className="btn-filters" onClick={onToggleFilters}>Filtros <span className={`filters-badge${filtersCount ? '' : ' hidden'}`}>{filtersCount}</span></button></div>
      </div>
    </header>
  );
}

// Cada botón hace toggle de un valor en el array del filtro correspondiente (tipos, gen, etc.)
export function PanelFiltros({ open, filters, onToggleFilter, onReset }) {
  return (
    <div className={`filter-panel${open ? ' open' : ' hidden'}`}>
      <div className="filter-panel-inner">
        <div className="filter-group"><div className="filter-group-label">Tipo</div><div className="filter-chips">{TODOS_TIPOS.map(t => <button key={t} className={`fchip ${filters.tipos.includes(t) ? 'active' : ''}`} onClick={() => onToggleFilter('tipos', t)}>{NOMBRES_TIPO[t]}</button>)}</div></div>
        <div className="filter-group"><div className="filter-group-label">Generación</div><div className="filter-chips">{GENERACIONES.map(g => <button key={g.gen} className={`fchip ${filters.generaciones.includes(g.gen) ? 'active' : ''}`} onClick={() => onToggleFilter('generaciones', g.gen)}>{g.name}</button>)}</div></div>
        <div className="filter-group"><div className="filter-group-label">Etapa evolutiva</div><div className="filter-chips">{[[0, 'Sin evolución'], [1, 'Primera'], [2, 'Segunda'], [3, 'Tercera']].map(([id, label]) => <button key={id} className={`fchip ${filters.etapas.includes(id) ? 'active' : ''}`} onClick={() => onToggleFilter('etapas', id)}>{label}</button>)}</div></div>
        <div className="filter-group"><div className="filter-group-label">Categoría</div><div className="filter-chips">{[['normal', 'No legendario'], ['legendary', 'Legendario'], ['mythical', 'Mítico'], ['mega', 'Mega'], ['gmax', 'Gigamax']].map(([id, label]) => <button key={id} className={`fchip ${filters.categorias.includes(id) ? 'active' : ''}`} onClick={() => onToggleFilter('categorias', id)}>{label}</button>)}</div></div>
        <div className="filter-panel-footer"><button className="btn-reset-filters" onClick={onReset}>Limpiar filtros</button></div>
      </div>
    </div>
  );
}

export function SeccionesPokedex({ sections, team, onToggleTeam, onOpenModal }) {
  return (
    <div id="genSections">
      {sections.map(section => (
        <div className="gen-section" key={section.title}>
          <div className="gen-section-header">
            <h2 className="gen-section-title">{section.title}</h2>
            <span className="gen-section-sub">{section.subtitle}</span>
            <span className="gen-section-count">{section.list.length} Pokémon</span>
          </div>
          <div className="pokemon-grid">
            {/* Tarjetas con información breve y acciones rápidas. */}
            {section.list.map(p => <TarjetaPokemon key={p.name} pokemon={p} inTeam={team.some(t => t.name === p.name)} onToggleTeam={onToggleTeam} onOpenModal={onOpenModal} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
