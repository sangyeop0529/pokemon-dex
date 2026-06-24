// PokeAPI 리스트 응답 타입
export interface PokemonListResponse {
  count: number;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}

// 포켓몬 상세 정보 타입
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}
