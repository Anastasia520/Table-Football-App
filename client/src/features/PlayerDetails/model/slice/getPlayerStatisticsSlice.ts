import { createSlice } from "@reduxjs/toolkit";

import { getPlayerStatistics } from "../services/getPlayerStatistics/getPlayerStatistics";
import { PlayerStatisticsRequestSchema } from "../types/playerStatisticsRequestSchema";

const initialState: PlayerStatisticsRequestSchema = {
  isLoading: false,
};

export const getPlayerStatisticsRequestSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerStatistics.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getPlayerStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getPlayerStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: getPlayerStatisticsRequestActions } =
  getPlayerStatisticsRequestSlice;
export const { reducer: getPlayerStatisticsRequestReducer } =
  getPlayerStatisticsRequestSlice;
