export {
  playerStatisticsActions,
  playerStatisticsReducer,
} from "./model/slice/playerStatisticsSlice";

export { playerStatisticsSlice } from "./model/slice/playerStatisticsSlice";

export { getPlayersStatisticsData } from "./model/selectors/getPlayersStatisticsData/getPlayersStatisticsData";

export {
  playersStatisticsActions,
  playersStatisticsReducer,
} from "./model/slice/playersStatisticsSlice";

export type {
  PlayersStatistics,
  PlayersStatisticsSchema,
} from "./model/types/playersStatistics";

export type { Player } from "./model/types/playerStatistic";
