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
    },
  },
});

export const { actions: playerStatisticsActions } = playerStatisticsSlice;
export const { reducer: playerStatisticsReducer } = playerStatisticsSlice;
