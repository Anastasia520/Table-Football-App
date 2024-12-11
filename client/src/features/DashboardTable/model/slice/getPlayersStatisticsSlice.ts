import { createSlice } from "@reduxjs/toolkit";

import { getPlayersStatistics } from "../services/getPlayersStatistics/getPlayersStatistics";
import { PlayersStatisticsRequestSchema } from "../types/playersStatisticsRequestSchema";

const initialState: PlayersStatisticsRequestSchema = {
  isLoading: false,
};

export const getPlayersStatisticsRequestSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayersStatistics.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getPlayersStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getPlayersStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: getPlayersStatisticsRequestActions } =
  getPlayersStatisticsRequestSlice;
export const { reducer: getPlayersStatisticsRequestReducer } =
  getPlayersStatisticsRequestSlice;
