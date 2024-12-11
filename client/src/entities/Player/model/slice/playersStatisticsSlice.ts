import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PlayersStatistics,
  PlayersStatisticsSchema,
} from "../types/playersStatistics";

const initialState: PlayersStatisticsSchema = {
  playersStatistics: null,
  isLoading: false,
};

export const playersStatisticsSlice = createSlice({
  name: "playersStatistics",
  initialState,
  reducers: {
    setPlayersStatisticsData: (
      state,
      action: PayloadAction<PlayersStatistics | null>
    ) => {
      state.playersStatistics = action.payload;
    },
  },
});

export const { actions: playersStatisticsActions } = playersStatisticsSlice;
export const { reducer: playersStatisticsReducer } = playersStatisticsSlice;
