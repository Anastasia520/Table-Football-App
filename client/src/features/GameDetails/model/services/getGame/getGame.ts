import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Game, gameActions } from "../../../../../entities/Game";

const URL = `${import.meta.env.VITE_BACK_URL}`;

export const getGame = createAsyncThunk<Game, string>(
  "game/getGame",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`${URL}/games/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(gameActions.setGameData(response.data));

      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
