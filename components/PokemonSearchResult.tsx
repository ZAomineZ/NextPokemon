import Link from "next/link";

export function PokemonSearchResult({ pokemons }: { pokemons: string[] }) {
  return pokemons.length > 0 ? (
    <div className="search-grid">
      {pokemons.map((pokemon) => {
        return (
          <Link href={`/pokemon/${pokemon}`} key={pokemon}>
            <a>
              <div className="pokemon-card">{pokemon}</div>
            </a>
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="search-message">No pokemons found</div>
  );
}
