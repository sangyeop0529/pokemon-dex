import { useNavigate, useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemon";
import { typeColors } from "../constants/typeColors";

// 스탯 이름 한글화
const statNames: Record<string, string> = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

// 스탯 최대값 (255 기준)
const MAX_STAT = 255;

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading, isError } = usePokemonDetail(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl animate-pulse">불러오는 중...</p>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-400 text-xl">포켓몬을 찾을 수 없어요 😢</p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const image = pokemon.sprites.other["official-artwork"].front_default;
  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] ?? "bg-gray-400";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 헤더 — 메인 타입 색상으로 */}
      <div className={`${bgColor} p-8 flex flex-col items-center gap-2`}>
        <button
          onClick={() => navigate("/")}
          className="self-start text-white opacity-80 hover:opacity-100 text-sm"
        >
          ← 목록으로
        </button>

        <span className="text-white opacity-70 font-mono text-lg">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <img
          src={image}
          alt={pokemon.name}
          className="w-48 h-48 object-contain drop-shadow-xl"
        />

        <h1 className="text-4xl font-bold text-white capitalize">
          {pokemon.name}
        </h1>

        {/* 타입 뱃지 */}
        <div className="flex gap-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="bg-white bg-opacity-30 text-black text-sm font-semibold px-4 py-1 rounded-full capitalize"
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      {/* 상세 정보 카드 */}
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-6">
        {/* 키 / 몸무게 */}
        <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-2 text-center">
          <div>
            <p className="text-gray-400 text-sm">키</p>
            <p className="text-2xl font-bold text-gray-800">
              {(pokemon.height / 10).toFixed(1)}m
            </p>
          </div>
          <div className="border-l border-gray-100">
            <p className="text-gray-400 text-sm">몸무게</p>
            <p className="text-2xl font-bold text-gray-800">
              {(pokemon.weight / 10).toFixed(1)}kg
            </p>
          </div>
        </div>

        {/* 스탯 */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h2 className="font-bold text-gray-700 text-lg">기본 스탯</h2>
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="flex items-center gap-3">
              {/* 스탯 이름 */}
              <span className="text-gray-400 text-sm w-20 shrink-0">
                {statNames[stat.name] ?? stat.name}
              </span>
              {/* 수치 */}
              <span className="text-gray-800 font-bold w-8 text-right shrink-0">
                {base_stat}
              </span>
              {/* 게이지 바 */}
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className={`${bgColor} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(base_stat / MAX_STAT) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
