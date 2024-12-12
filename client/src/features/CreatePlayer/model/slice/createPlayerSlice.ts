import { createSlice } from "@reduxjs/toolkit";

import { postCreatePlayer } from "../services/postCreatePlayer/postCreatePlayer";
import { CreatePlayerSchema } from "../types/createPlayerSchema";

const initialState: CreatePlayerSchema = {
  isLoading: false,
  name: "",
};

export const createPlayerSlice = createSlice({
  name: "createPlayer",
  initialState,
  reducers: {
    // for required reducers only
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreatePlayer.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(postCreatePlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(postCreatePlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});

export const { actions: createPlayerActions } = createPlayerSlice;
export const { reducer: createPlayerReducer } = createPlayerSlice;
