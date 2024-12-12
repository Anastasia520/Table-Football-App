import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { createReducerManager } from "./reducerManager";
import {
  teamsStatisticsReducer,
  teamStatisticsReducer,
} from "../../../../entities/Team";
import { playersStatisticsReducer } from "../../../../entities/Player";
import { playerStatisticsReducer } from "../../../../entities/Player/model/slice/playerStatisticsSlice";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    // required reducers only
    teamsStatistics: teamsStatisticsReducer,
    teamStatistics: teamStatisticsReducer,

    playersStatistics: playersStatisticsReducer,
    playerStatistics: playerStatisticsReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducer);
  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: true,
    preloadedState: initialState,
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
