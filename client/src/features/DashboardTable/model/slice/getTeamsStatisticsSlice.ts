import { createSlice } from "@reduxjs/toolkit";

import { getTeamsStatistics } from "../services/getTeamsStatistics/getTeamsStatistics";
import { TeamsStatisticsRequestSchema } from "../types/teamsStatisticsRequestSchema";

const initialState: TeamsStatisticsRequestSchema = {
  isLoading: false,
};

export const getTeamsStatisticsRequestSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsStatistics.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getTeamsStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getTeamsStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: getTeamsStatisticsRequestActions } =
  getTeamsStatisticsRequestSlice;
export const { reducer: getTeamsStatisticsRequestReducer } =
  getTeamsStatisticsRequestSlice;
