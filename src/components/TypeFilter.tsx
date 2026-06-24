import { typeColors } from "../constants/typeColors";

const TYPES = [
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "fairy",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
];

interface TypeFilterProps {
  selected: string | null;
  onChange: (type: string | null) => void;
}

export default function TypeFilter({ selected, onChange }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
      {/* 전체 버튼 */}
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all
          ${
            selected === null
              ? "bg-gray-800 text-white scale-105"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
      >
        전체
      </button>

      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(selected === type ? null : type)}
          className={`px-3 py-1 rounded-full text-sm font-semibold text-white capitalize transition-all
            ${typeColors[type]}
            ${selected === type ? "scale-105 ring-2 ring-offset-1 ring-gray-400" : "opacity-70 hover:opacity-100"}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
