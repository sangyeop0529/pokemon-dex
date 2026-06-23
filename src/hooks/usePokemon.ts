import { useQuery } from "@tanstack/react-query";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const listData: PokemonListResponse = await listRes.json();

  const pokemonDetails = await Promise.all(
    listData.results.map((p) => fetch(p.url).then((r) => r.json())),
  );

  return pokemonDetails;
};

export const usePokemonList = () => {
  return useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemonList,
  });
};
