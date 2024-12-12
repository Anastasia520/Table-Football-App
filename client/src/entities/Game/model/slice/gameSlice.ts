import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../types/game";

const initialState: Game = {
  id: "",
  team1_id: null,
  team2_id: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<Game | null>) => {
      state.id = action.payload?.id;
      state.team1_id = action.payload?.team1_id;
      state.team2_id = action.payload?.team2_id;
      state.status = action.payload?.status;
      state.goals_team1 = action.payload?.goals_team1;
      state.goals_team2 = action.payload?.goals_team2;
    },
  },
});

export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
