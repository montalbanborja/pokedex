import { COLORES_TIPO, NOMBRES_TIPO } from '../../../datos-juegos';
import { formatearNombre } from '../../context/selectoresPokedex';

export function TarjetaPokemon({ pokemon, inTeam, onToggleTeam, onOpenModal }) {
  // Color de borde según primer tipo; si falla, un azul por defecto
  const color = COLORES_TIPO[pokemon.types?.[0]] || '#4f8ef7';
  const nombreCompleto = formatearNombre(pokemon.name);

  return (
    <div
      className={`pokemon-card${inTeam ? ' in-equipo' : ''}${pokemon.isMega || pokemon.isGmax || pokemon.isRegional ? ' is-special-form' : ''}`}
      style={{ '--card-color': color }}
      // Click simple = meter/quitar equipo (lo pedía así la práctica, es rápido)
      onClick={() => onToggleTeam(pokemon)}
      onDoubleClick={e => {
        // Doble click abre detalle rápido sin quitar/poner equipo.
        e.stopPropagation();
        onOpenModal(pokemon);
      }}
      onContextMenu={e => {
        e.preventDefault();
        onOpenModal(pokemon);
      }}
    >
      <span className="card-tag">#{String(pokemon.id).padStart(4, '0')}</span>
      <div className="card-img-wrap">
        <img className="card-img" src={pokemon.sprite} alt={nombreCompleto} loading="lazy" />
      </div>
      <span className="card-name">{nombreCompleto}</span>
      <div className="card-types">
        {pokemon.types.map(t => (
          <span key={t} className={`type-badge type-${t}`}>{NOMBRES_TIPO[t] || t}</span>
        ))}
      </div>
    </div>
  );
}
