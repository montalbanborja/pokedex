import { ETIQUETAS_STAT } from '../../../datos-juegos';
import { formatearNombre } from '../../context/selectoresPokedex';

export function ModalPokemon({ pokemon, inTeam, teamFull, onClose, onToggleTeam }) {
  if (!pokemon) return null;

  return (
    // Clic fuera del modal (en el fondo) = cerrar; clic dentro no burbujea a esto
    <div className="modal-backdrop open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-hero">
          <span className="modal-num">#{String(pokemon.id).padStart(4, '0')}</span>
          <img className="modal-img" src={pokemon.sprite} alt={formatearNombre(pokemon.name)} />
          <h2 className="modal-name">{formatearNombre(pokemon.name)}</h2>
        </div>
        <div className="modal-body">
          {/* La API devuelve décimas de metro/kg; por eso divido entre 10 */}
          <div className="modal-row"><label>Altura</label><span>{pokemon.height ? `${(pokemon.height / 10).toFixed(1)} m` : '—'}</span></div>
          <div className="modal-row"><label>Peso</label><span>{pokemon.weight ? `${(pokemon.weight / 10).toFixed(1)} kg` : '—'}</span></div>
        </div>
        {!!pokemon.stats?.length && (
          <div className="modal-stats">
            <h4>Estadísticas base</h4>
            {pokemon.stats.map(s => {
              // Paso el valor a porcentaje para pintar la barra de manera visual.
              const pct = Math.min(100, Math.round((s.base_stat / 255) * 100));
              return (
                <div className="stat-row" key={s.stat.name}>
                  <span className="stat-label">{ETIQUETAS_STAT[s.stat.name] || s.stat.name}</span>
                  <div className="stat-bar-bg"><div className="stat-bar" style={{ width: `${pct}%` }} /></div>
                  <span className="stat-val">{s.base_stat}</span>
                </div>
              );
            })}
          </div>
        )}
        <button className={`modal-add ${inTeam ? 'in-equipo' : teamFull ? 'full' : ''}`} onClick={() => onToggleTeam(pokemon)}>
          {inTeam ? '✓ En el equipo — Quitar' : teamFull ? 'Equipo lleno (6/6)' : '+ Añadir al equipo'}
        </button>
      </div>
    </div>
  );
}
