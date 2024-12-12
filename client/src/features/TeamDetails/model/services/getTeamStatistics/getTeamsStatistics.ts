import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  teamStatisticsActions,
  TeamStatisticsSchema,
} from "../../../../../entities/Team";

const URL = `${import.meta.env.VITE_BACK_URL}`;

export const getTeamStatistics = createAsyncThunk<TeamStatisticsSchema, string>(
  "teams/getTeamStatistics",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`${URL}/teams/${id}`, {
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
        teamStatisticsActions.setTeamStatisticsData(response.data)
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
