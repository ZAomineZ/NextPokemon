import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { PokemonCard } from "../../components/PokemonCard";
import { GetStaticPaths, GetStaticProps } from "next";

interface PokemonData {
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: { front_default: string };
    };
  };
  weight: number;
  base_experience: number;
  abilities: any[];
}

const fetchPokemon = (id: string) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(({ data }) => data);
};

export default function Pokemon() {
  const router = useRouter();
  const pokemonID = typeof router.query?.id === "string" ? router.query.id : "";

  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError,
  } = useQuery<PokemonData>(
    ["getPokemon", pokemonID],
    () => fetchPokemon(pokemonID),
    {
      enabled: pokemonID.length > 0,
    }
  );

  if (isSuccess) {
    return (
      <div className="container">
        <PokemonCard
          name={pokemon!.name}
          image={pokemon!.sprites?.other?.["official-artwork"]?.front_default}
          weight={pokemon!.weight}
          xp={pokemon!.base_experience}
          abilities={pokemon!.abilities?.map((item) => item.ability.name)}
        />
      </div>
    );
  }

  if (isLoading) return <div className="center">Loading...</div>;

  if (isError) {
    return (
      <div className="center">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        We couldn't find your pokemon{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  return <></>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getPokemon", id], () => fetchPokemon(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
