import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  playerStatisticsActions,
  Player,
} from "../../../../../entities/Player";

const URL = `${import.meta.env.VITE_BACK_URL}`;

export const getPlayerStatistics = createAsyncThunk<Player, string>(
  "players/getPlayerStatistics",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`${URL}/players/${id}`, {
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
        playerStatisticsActions.setPlayerStatisticsData(response.data)
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
