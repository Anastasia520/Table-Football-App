import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";

import { TeamStatisticsSchema } from "../../../../entities/Team";

import { PlayersStatisticsSchema } from "../../../../entities/Player";
import {
  PlayersStatisticsRequestSchema,
  TeamsStatisticsRequestSchema,
} from "../../../../features/DashboardTable";

export interface StateSchema {
  teamsStatistics: TeamStatisticsSchema;
  playersStatistics: PlayersStatisticsSchema;
  // async reducers
  teamStatisticsRequest?: TeamsStatisticsRequestSchema;
  playersStatisticsRequest?: PlayersStatisticsRequestSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
