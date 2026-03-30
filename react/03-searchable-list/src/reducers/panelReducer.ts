import type { PanelAction, PanelState } from "../types/game";

export const initialPanelState: PanelState = {
  status: "closed",
  selectedGame: null,
};

export const panelReducer = (
  state: PanelState,
  action: PanelAction,
): PanelState => {
  switch (action.type) {
    case "SELECT_GAME":
      console.log('select game action')
      return { status: "loading", selectedGame: action.payload };
    case "PANEL_READY":
      console.log('panel ready action')
      return { ...state, status: "opened" };
    case "CLOSE_PANEL":
      return { status: "closed", selectedGame: null };
    default:
      return state;
  }
};
