import { useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import { usePokemonList } from "../hooks/usePokemon";

export default function HomePage() {
  const { data: pokemonList, isLoading, isError } = usePokemonList();
  const [search, setSearch] = useState("");

  const filteredList = useMemo(() => {
    if (!pokemonList) return [];
    return pokemonList.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [pokemonList, search]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl animate-pulse">
          포켓몬 불러오는 중...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">
          오류가 발생했어요. 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 헤더 */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🔴 포켓몬 도감
      </h1>

      {/* 검색바 */}
      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* 검색 결과 없을 때 */}
      {filteredList.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-20">
          <p>😢 "{search}"에 해당하는 포켓몬이 없어요</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
