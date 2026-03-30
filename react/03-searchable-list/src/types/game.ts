export interface Game {
  id: string;
  name: string;
}

export type PanelStatus = "opened" | "closed" | "loading";

export interface PanelState {
  status: PanelStatus;
  selectedGame: Game | null;
}

export type PanelAction =
  | {
      type: "SELECT_GAME";
      payload: Game;
    }
  | { type: "PANEL_READY" }
  | { type: "CLOSE_PANEL" };
