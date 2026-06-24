import { useQuery } from "@tanstack/react-query";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

// 1~151번 포켓몬 목록 fetch
const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const listData: PokemonListResponse = await listRes.json();

  // 각 포켓몬 상세 정보를 병렬로 fetch
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

// 기존 usePokemonList 아래에 추가
const fetchPokemonDetail = async (id: string): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("포켓몬을 찾을 수 없어요");
  return res.json();
};

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonDetail(id),
  });
};
