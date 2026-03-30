import type { Game, PanelStatus } from "../types/game";

export const SidePanel = ({
  status,
  selectedGame,
}: {
  status: PanelStatus;
  selectedGame: Game | null;
}) => {
  if (status === "closed" || !selectedGame) {
    return null;
  }

  return (
    <div className="game-details">
      {status === "loading" && <p>Loading...</p>}
      {status === "opened" && selectedGame && (
        <>
          <p>{selectedGame.name}</p>
          <button>Close</button>
        </>
      )}
    </div>
  );
};
