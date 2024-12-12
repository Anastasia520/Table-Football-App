import { createSlice } from "@reduxjs/toolkit";

import { postCreateGame } from "../services/postCreateGame/postCreateGame";
import { CreateGameSchema } from "../types/createGameSchema";

const initialState: CreateGameSchema = {
  isLoading: false,
  team1_id: "",
  team2_id: "",
};

export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateGame.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(postCreateGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(postCreateGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: createGameActions } = createGameSlice;
export const { reducer: createGameReducer } = createGameSlice;
