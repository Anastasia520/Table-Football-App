import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../types/playerStatistic";

const initialState: Player = {
  id: "",
  name: "",
};

export const playerStatisticsSlice = createSlice({
  name: "playerStatistics",
  initialState,
  reducers: {
    setPlayerStatisticsData: (state, action: PayloadAction<Player | null>) => {
      state.id = action.payload?.id;
      state.name = action.payload?.name;
      state.games = action.payload?.games;
      state.games_played = action.payload?.games_played;
      state.goal_difference = action.payload?.goal_difference;
      state.goals_against = action.payload?.goals_against;
      state.goals_for = action.payload?.goals_for;
      state.losses = action.payload?.losses;
      state.wins = action.payload?.wins;
      state.win_ratio = action.payload?.win_ratio;
    },
  },
});

export const { actions: playerStatisticsActions } = playerStatisticsSlice;
export const { reducer: playerStatisticsReducer } = playerStatisticsSlice;
