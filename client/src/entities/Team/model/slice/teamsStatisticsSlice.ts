import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TeamStatistics, TeamStatisticsSchema } from "../types/teamsStatistics";

const initialState: TeamStatisticsSchema = {
  teamsStatistics: null,
  isLoading: false,
};

export const teamsStatisticsSlice = createSlice({
  name: "teamsStatistics",
  initialState,
  reducers: {
    setTeamsStatisticsData: (
      state,
      action: PayloadAction<TeamStatistics | null>
    ) => {
      state.teamsStatistics = action.payload;
    },
  },
});

export const { actions: teamsStatisticsActions } = teamsStatisticsSlice;
export const { reducer: teamsStatisticsReducer } = teamsStatisticsSlice;
