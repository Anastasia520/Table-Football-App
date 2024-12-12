import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Team } from "../types/teamStatistic";

const initialState: Team = {
  id: "",
  name: "",
};

export const teamStatisticsSlice = createSlice({
  name: "teamStatistics",
  initialState,
  reducers: {
    setTeamStatisticsData: (state, action: PayloadAction<Team | null>) => {
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
      state.player_1 = action.payload?.player_1;
      state.player_2 = action.payload?.player_2;
    },
  },
});

export const { actions: teamStatisticsActions } = teamStatisticsSlice;
export const { reducer: teamStatisticsReducer } = teamStatisticsSlice;
