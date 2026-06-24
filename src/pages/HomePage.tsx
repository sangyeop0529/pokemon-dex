import { useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { usePokemonList } from "../hooks/usePokemon";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import { useFavorites } from "../hooks/useFavorites";

export default function HomePage() {
  const { data: pokemonList, isLoading, isError } = usePokemonList();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredList = useMemo(() => {
    if (!pokemonList) return [];
    return pokemonList.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType
        ? p.types.some((t) => t.type.name === selectedType)
        : true;
      const matchesFavorite = showFavoritesOnly ? isFavorite(p.id) : true;
      return matchesSearch && matchesType && matchesFavorite;
    });
  }, [pokemonList, search, selectedType, showFavoritesOnly, isFavorite]);

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
        🎖️ 포켓몬 도감
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilter selected={selectedType} onChange={setSelectedType} />

        {/* 즐겨찾기 토글 */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${
                showFavoritesOnly
                  ? "bg-yellow-400 text-white scale-105"
                  : "bg-white text-gray-500 border border-gray-300 hover:border-yellow-400"
              }`}
          >
            {showFavoritesOnly ? "⭐ 즐겨찾기만 보기" : "☆ 즐겨찾기만 보기"}
          </button>
        </div>
      </div>

      {/* 결과 카운트 */}
      <p className="text-center text-gray-400 text-sm mb-4">
        {filteredList.length}마리의 포켓몬
      </p>

      {/* 검색 결과 없을 때 */}
      {filteredList.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-20">
          {showFavoritesOnly ? (
            <p>⭐ 즐겨찾기한 포켓몬이 없어요</p>
          ) : (
            <p>😢 해당하는 포켓몬이 없어요</p>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
