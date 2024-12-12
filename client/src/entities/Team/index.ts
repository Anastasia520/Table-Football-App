export {
  teamStatisticsActions,
  teamStatisticsReducer,
} from "./model/slice/teamStatisticsSlice";

export { getTeamsStatisticsData } from "./model/selectors/getTeamsStatisticsData/getTeamsStatisticsData";
export { getTeamStatisticsData } from "./model/selectors/getTeamStatisticsData/getTeamStatisticsData";

export {
  teamsStatisticsActions,
  teamsStatisticsReducer,
} from "./model/slice/teamsStatisticsSlice";

export type {
  TeamStatistics,
  TeamStatisticsSchema,
} from "./model/types/teamsStatistics";

export type { Team } from "./model/types/teamStatistic";
