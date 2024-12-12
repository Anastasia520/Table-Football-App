import { createSlice } from "@reduxjs/toolkit";

import { GameRequestSchema } from "../types/gameRequestSchema";
import { getGame } from "../services/getGame/getGame";

const initialState: GameRequestSchema = {
  isLoading: false,
};

export const getGameSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGame.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: getGameActions } = getGameSlice;
export const { reducer: getGameReducer } = getGameSlice;
