import { useState } from "react";
import { useDebounce } from "../utils/useDebounce";
import { useQuery } from "react-query";
import { searchPokemons } from "../utils/searchPokemons";
import { PokemonSearchResult } from "../components/PokemonSearchResult";

export default function IndexPage(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["searchPokemons", debouncedSearchValue],
    () => searchPokemons(debouncedSearchValue),
    {
      enabled: debouncedSearchValue.length > 0,
    }
  );

  const renderResult = () => {
    if (isLoading) return <div className="search-message">Loading...</div>;

    if (isError)
      return <div className="search-message">Something went wrong</div>;

    if (isSuccess) return <PokemonSearchResult pokemons={data as string[]} />;

    return <></>;
  };

  return (
    <div className="home">
      <h1>Search your Pokemon</h1>
      <input
        type="text"
        onChange={({ target: { value } }) => setSearchValue(value)}
      />
      {renderResult()}
    </div>
  );
}
