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
import { CreatePlayerSchema } from "../../../../features/CreatePlayer";
import { Player } from "../../../../entities/Player/model/types/playerStatistic";

export interface StateSchema {
  teamsStatistics: TeamStatisticsSchema;
  playersStatistics: PlayersStatisticsSchema;
  playerStatistics: Player;
  // async reducers
  teamStatisticsRequest?: TeamsStatisticsRequestSchema;
  playersStatisticsRequest?: PlayersStatisticsRequestSchema;
  createPlayer?: CreatePlayerSchema;
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
