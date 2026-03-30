import { useContext } from "react";
import { useGameSearch } from "../hooks/useGameSearch";
import { FavoritesContext } from "../context/favorites/context";
import { useGamePanel } from "../hooks/useGamePanel";
import { SidePanel } from "./SidePanel";

export const SearchableList = () => {
  const { filteredGames, isLoading, isError, search, setSearch } =
    useGameSearch();

  const { onGameSelected, state } = useGamePanel();

  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    return <div>Can't load favorites data</div>;
  }

  const { toggleFavorite, favorites, favoritesCount, clearFavorites } = ctx;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Fail to load games.</div>;
  }

  return (
    <div className="games-list">
      <div className="favorites-count">
        <div>{`Favorites: ${favoritesCount}`}</div>
        <button onClick={clearFavorites}>Clear All</button>
      </div>
      <input
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder="Search for a game"
      />
      {filteredGames.length === 0 ? (
        <div>No games found</div>
      ) : (
        filteredGames.map((game) => (
          <div
            className="game-card"
            key={game.id}
            onClick={() => onGameSelected(game)}
          >
            <p>{game.name}</p>
            <button
              className={favorites.includes(game.id) ? "is-favorite" : ""}
              onClick={() => toggleFavorite(game.id)}
            >
              ★
            </button>
          </div>
        ))
      )}
      <SidePanel status={state.status} selectedGame={state.selectedGame} />
    </div>
  );
};
