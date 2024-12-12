import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreatePlayerSchema } from "../../types/createPlayerSchema";
import { playerStatisticsActions } from "../../../../../entities/Player/model/slice/playerStatisticsSlice";

const URL = `${import.meta.env.VITE_BACK_URL}`;

interface postCreatePlayerProps {
  name: string;
}

export const postCreatePlayer = createAsyncThunk<
  CreatePlayerSchema,
  postCreatePlayerProps
>("createPlayer/create", async (data, thunkAPI) => {
  try {
    const response = await axios(`${URL}/players`, {
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

    thunkAPI.dispatch(
      playerStatisticsActions.setPlayerStatisticsData(response.data)
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
