import { createSlice } from "@reduxjs/toolkit";

import { postCreateTeam } from "../services/postCreatePlayer/postCreateTeam";
import { CreateTeamSchema } from "../types/createTeamSchema";

const initialState: CreateTeamSchema = {
  isLoading: false,
  name: "",
  player1_id: "",
};

export const createTeamSlice = createSlice({
  name: "createTeam",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateTeam.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(postCreateTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(postCreateTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: createTeamActions } = createTeamSlice;
export const { reducer: createTeamReducer } = createTeamSlice;
