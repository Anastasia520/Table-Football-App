import { createSlice } from "@reduxjs/toolkit";

import { TeamStatisticsRequestSchema } from "../types/teamStatisticsRequestSchema";
import { getTeamStatistics } from "../services/getTeamStatistics/getTeamsStatistics";

const initialState: TeamStatisticsRequestSchema = {
  isLoading: false,
};

export const getTeamStatisticsRequestSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamStatistics.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getTeamStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getTeamStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: getTeamStatisticsRequestActions } =
  getTeamStatisticsRequestSlice;
export const { reducer: getTeamStatisticsRequestReducer } =
  getTeamStatisticsRequestSlice;
