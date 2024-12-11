import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";

import { TeamStatisticsSchema } from "../../../../entities/Team";
import { TeamStatisticsRequestSchema } from "../../../../features/DashboardTable/model/types/teamStatisticsRequestSchema";

export interface StateSchema {
  teamsStatistics: TeamStatisticsSchema;

  // async reducers
  teamStatisticsRequest?: TeamStatisticsRequestSchema;
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
