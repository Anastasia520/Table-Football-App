import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  playersStatisticsActions,
  PlayersStatisticsSchema,
} from "../../../../../entities/Player";

const URL = `${import.meta.env.VITE_BACK_URL}`;

export const getPlayersStatistics = createAsyncThunk<PlayersStatisticsSchema>(
  "players/getPlayersStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${URL}/players`, {
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
        playersStatisticsActions.setPlayersStatisticsData(response.data)
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
