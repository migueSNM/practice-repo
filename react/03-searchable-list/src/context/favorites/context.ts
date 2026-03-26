import { createContext } from "react";

interface FavoritesContextType {
  favorites: string[];
  favoritesCount: number;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
