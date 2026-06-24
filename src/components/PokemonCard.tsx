import { useNavigate } from "react-router-dom";
import { typeColors } from "../constants/typeColors";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col items-center gap-2 cursor-pointer"
    >
      {/* 즐겨찾기 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭 이벤트 전파 차단
          onToggleFavorite(pokemon.id);
        }}
        className="absolute top-3 right-3 text-xl hover:scale-125 transition-transform"
      >
        {isFavorite ? "⭐" : "☆"}
      </button>

      <span className="self-start text-xs text-gray-400 font-mono">
        #{String(pokemon.id).padStart(3, "0")}
      </span>
      <img
        src={image}
        alt={pokemon.name}
        className="w-28 h-28 object-contain"
      />
      <p className="font-bold text-gray-800 capitalize text-lg">
        {pokemon.name}
      </p>
      <div className="flex gap-1">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`${typeColors[type.name] ?? "bg-gray-300"} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
