import { useMemo, useState, type ReactNode } from "react";
import { FavoritesContext } from "./context";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prevState) =>
      prevState.includes(id)
        ? prevState.filter((fav) => fav !== id)
        : [...prevState, id],
    );
  };

  const clearFavorites = () => {
    setFavorites([])
  }

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, favoritesCount, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
