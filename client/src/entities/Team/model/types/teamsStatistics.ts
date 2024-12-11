import { Team } from "./teamStatistic";

 export interface TeamStatistics {
  count: number,
  pages_count: number,
  current_page: number,
  teams: Array<Team>
}


export interface TeamStatisticsSchema {
  teamsStatistics?:TeamStatistics | null
  isLoading?: boolean;
  error?: string;
}

