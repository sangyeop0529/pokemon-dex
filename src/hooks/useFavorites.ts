import { useState } from "react";

const STORAGE_KEY = "pokemon-favorites";

const loadFavorites = (): number[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (ids: number[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      saveFavorites(next);
      return next;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};
