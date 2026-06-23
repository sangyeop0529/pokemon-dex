const typeColors: Record<string, string> = {
  fire: "bg-orange-400",
  water: "bg-blue-400",
  grass: "bg-green-400",
  electric: "bg-yellow-400",
  psychic: "bg-pink-400",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-500",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-red-600",
  flying: "bg-sky-300",
  poison: "bg-purple-400",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-500",
  ghost: "bg-purple-700",
};

import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const image = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col items-center gap-2 cursor-pointer">
      {/* 도감 번호 */}
      <span>#{String(pokemon.id).padStart(3, "0")}</span>

      {/* 이미지 */}
      <img
        src={image}
        alt={pokemon.name}
        className="w-28 h-28 object-contain"
      />

      {/* 이름 */}
      <p className="font-bold text-gray-800 capitalize text-lg">
        {pokemon.name}
      </p>

      {/* 타입 뱃지 */}
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
