import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateTeamSchema } from "../../types/createTeamSchema";
import { teamStatisticsActions } from "../../../../../entities/Team";

const URL = `${import.meta.env.VITE_BACK_URL}`;

interface postCreateTeamProps {
  name: string;
  player1_id: string;
  player2_id?: string | null;
}

export const postCreateTeam = createAsyncThunk<
  CreateTeamSchema,
  postCreateTeamProps
>("createTeam/create", async (data, thunkAPI) => {
  try {
    const response = await axios(`${URL}/teams`, {
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
      teamStatisticsActions.setTeamStatisticsData(response.data)
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
