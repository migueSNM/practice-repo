import { useEffect, useReducer } from "react";
import { initialPanelState, panelReducer } from "../reducers/panelReducer";
import type { Game } from "../types/game";

export const useGamePanel = () => {
  const [state, dispatch] = useReducer(panelReducer, initialPanelState);

  useEffect(() => {
    if (state.status !== "loading") {
      return;
    }
    console.log('is loading')
    const timer = setTimeout(() => dispatch({ type: "PANEL_READY" }), 1000);
    return () => clearTimeout(timer);
  }, [state.status]);

  const onGameSelected = (game: Game) => {
    console.log('on game selected')
    dispatch({ type: "SELECT_GAME", payload: game });
  };

  return { onGameSelected, state };
};
