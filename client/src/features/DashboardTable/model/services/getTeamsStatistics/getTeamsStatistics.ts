import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  teamsStatisticsActions,
  TeamStatisticsSchema,
} from "../../../../../entities/Team";

const URL = `${import.meta.env.VITE_BACK_URL}`;

export const getTeamsStatistics = createAsyncThunk<TeamStatisticsSchema, null>(
  "teams/getTeamsStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${URL}/teams`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(
        teamsStatisticsActions.setTeamsStatisticsData(response.data)
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
