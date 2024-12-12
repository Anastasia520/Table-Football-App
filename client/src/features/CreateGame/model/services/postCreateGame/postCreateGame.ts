import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateGameSchema } from "../../types/createGameSchema";
import { gameActions } from "../../../../../entities/Game";

const URL = `${import.meta.env.VITE_BACK_URL}`;

interface postCreateGameProps {
  team1_id: string | null;
  team2_id: string | null;
}

export const postCreateGame = createAsyncThunk<
  CreateGameSchema,
  postCreateGameProps
>("createGame/create", async (data, thunkAPI) => {
  try {
    const response = await axios(`${URL}/games`, {
      method: "post",
      data: data,
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
});
