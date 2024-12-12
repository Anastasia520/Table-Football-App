import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Game, gameActions, GameStatus } from "../../../../../entities/Game";

const URL = `${import.meta.env.VITE_BACK_URL}`;

interface putGameProps {
  id: string;
  data: GameType;
}

type GameType = {
  goals_team1?: number;
  goals_team2?: number;
  status?: GameStatus | string;
};

export const putGame = createAsyncThunk<Game, putGameProps>(
  "updateGame/update",
  async (data, thunkAPI) => {
    try {
      const response = await axios(`${URL}/games/${data.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        data: data.data,
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
