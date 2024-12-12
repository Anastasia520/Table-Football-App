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
    },
  },
});

export const { actions: teamStatisticsActions } = teamStatisticsSlice;
export const { reducer: teamStatisticsReducer } = teamStatisticsSlice;
