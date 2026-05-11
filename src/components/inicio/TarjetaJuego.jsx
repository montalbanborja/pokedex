import { Link } from 'react-router-dom';

export function TarjetaJuego({ game }) {
  // game.version viene como "1996 · Game Boy"; parto por el · para pintar año y consola
  const partesVersion = game.version.split('·');
  const anio = partesVersion[0]?.trim();
  const plataforma = partesVersion[partesVersion.length - 1]?.trim();
  return (
    // El id del juego en la URL es lo que useDatosPokedex usa para saber qué cargar
    <Link className="game-card" to={`/pokedex?game=${encodeURIComponent(game.id)}`}>
      <div className="game-card-stripe" style={{ '--stripe-color': game.color1 }} />
      <div className="game-card-logo-wrap">
        <div className="game-card-logo-bg" style={{ '--c1': game.color1, '--c2': game.color2 }} />
        <img className="game-card-logo" src={game.logo} alt={game.name} loading="lazy" />
      </div>
      <div className="game-card-info">
        <div className="game-card-name">{game.name}</div>
        <div className="game-card-meta"><span className="game-card-platform">{plataforma}</span><span className="game-card-year">{anio}</span></div>
      </div>
      <div className="game-card-arrow"><div className="game-card-arrow-inner">→</div></div>
    </Link>
  );
}
