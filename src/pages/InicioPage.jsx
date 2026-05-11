import { Link } from 'react-router-dom';
import { JUEGOS } from '../../datos-juegos';
import { usePokedexContext } from '../context/PokedexContext';
import { TarjetaJuego } from '../components/inicio/TarjetaJuego';

export function InicioPage() {
  const { state, dispatch } = usePokedexContext();
  // Agrupo juegos por gen (let's go lo meto aparte en spinoff para que no rompa el bloque de gen 7)
  const juegosPorGeneracion = JUEGOS.reduce((acc, game) => {
    const key = game.id === 'lets-go' ? 'spinoff' : game.gen;
    acc[key] = acc[key] || [];
    acc[key].push(game);
    return acc;
  }, {});

  return (
    <div className="home-body">
      <header className="home-header">
        <div className="home-header-inner">
          <div className="logo">
            <div className="logo-ball">
              <div className="lb-top"></div><div className="lb-band"></div>
              <div className="lb-bottom"></div><div className="lb-center"></div>
            </div>
            <h1>PokéDex</h1>
          </div>
          <div className="home-header-actions">
            <button className="btn-icon" title="Cambiar tema" onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
              <span className="theme-icon">{state.theme === 'dark' ? '☀' : '☾'}</span>
            </button>
            {/* ?mode=all le dice al hook que cargue el listado global, no un juego concreto */}
            <Link className="btn-all" to={{ pathname: '/pokedex', search: '?mode=all' }}>Ver todos los Pokémon</Link>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="section" id="juegos">
          {/* Lista fija de bloques: así controlo el orden (I, II, III...) sin depender de las keys del reduce */}
          {[
            ['I', 'Kanto', 1], ['II', 'Johto', 2], ['III', 'Hoenn', 3], ['IV', 'Sinnoh', 4], ['V', 'Unova', 5],
            ['VI', 'Kalos', 6], ['VII', 'Alola', 7], ['VIII', 'Galar', 8], ['IX', 'Paldea', 9], ['✦', 'Spin-offs', 'spinoff'],
          ].map(([roman, region, key]) => (
            <div className="gen-block" key={String(key)}>
              <div className="gen-block-label"><span className="gen-roman">{roman}</span><span className="gen-region">{region}</span><span className="gen-game-count">{(juegosPorGeneracion[key] || []).length} juegos</span></div>
              <div className="games-row">{(juegosPorGeneracion[key] || []).map(game => <TarjetaJuego key={game.id} game={game} />)}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
