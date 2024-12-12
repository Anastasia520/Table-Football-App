import { createSlice } from "@reduxjs/toolkit";

import { GameRequestSchema } from "../types/gameRequestSchema";

import { putGame } from "../services/putGame/putGame";

const initialState: GameRequestSchema = {
  isLoading: false,
};

export const putGameSlice = createSlice({
  name: "updateGame",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(putGame.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(putGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(putGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: putGameActions } = putGameSlice;
export const { reducer: putGameReducer } = putGameSlice;
