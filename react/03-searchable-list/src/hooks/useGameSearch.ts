import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../api/games";
import { useState } from "react";
import type { Game } from "../types/game";

export const useGameSearch = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const filteredGames = (data ?? []).filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase()),
  );

  return { filteredGames, isLoading, isError, search, setSearch };
};
