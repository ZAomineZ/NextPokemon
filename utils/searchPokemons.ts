import { ALL_POKEMON_SPECIES } from "../constants/pokemonSpecies";

export function searchPokemons(query: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const matchingPokemons = ALL_POKEMON_SPECIES.filter(({ name }) => {
      return name.includes(query.toLowerCase());
    }).map(({ name }) => name);

    setTimeout(() => {
      resolve(matchingPokemons);
    });
  });
}
