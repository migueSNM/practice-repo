import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../api/games";
import { useState } from "react";

interface Game {
  id: string;
  name: string;
}

export const SearchableList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Fail to load games.</div>;
  }

  const filteredGames = (data ?? []).filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder="Search for a game"
      />
      {filteredGames.length === 0 && <div>No games found</div>}
      {filteredGames.map((game) => (
        <div key={game.id}>
          <p>{game.name}</p>
        </div>
      ))}
    </div>
  );
};
