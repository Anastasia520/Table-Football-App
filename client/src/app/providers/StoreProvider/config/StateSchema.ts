import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";

import { Team, TeamStatisticsSchema } from "../../../../entities/Team";

import { PlayersStatisticsSchema } from "../../../../entities/Player";
import {
  PlayersStatisticsRequestSchema,
  TeamsStatisticsRequestSchema,
} from "../../../../features/DashboardTable";
import { CreatePlayerSchema } from "../../../../features/CreatePlayer";
import { Player } from "../../../../entities/Player/model/types/playerStatistic";
import { CreateTeamSchema } from "../../../../features/CreateTeam";
import { CreateGameSchema } from "../../../../features/CreateGame";
import { Game } from "../../../../entities/Game/model/types/game";
import { TeamStatisticsRequestSchema } from "../../../../features/TeamDetails/model/types/teamStatisticsRequestSchema";
import { PlayerStatisticsRequestSchema } from "../../../../features/PlayerDetails/model/types/playerStatisticsRequestSchema";

export interface StateSchema {
  teamsStatistics: TeamStatisticsSchema;
  teamStatistics: Team;

  playersStatistics: PlayersStatisticsSchema;
  playerStatistics: Player;

  game: Game;

  // async reducers
  teamsStatisticsRequest?: TeamsStatisticsRequestSchema;
  teamStatisticsRequest?: TeamStatisticsRequestSchema;

  playersStatisticsRequest?: PlayersStatisticsRequestSchema;
  playerStatisticsRequest?: PlayerStatisticsRequestSchema;

  createPlayer?: CreatePlayerSchema;
  createTeam?: CreateTeamSchema;
  createGame?: CreateGameSchema;
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
