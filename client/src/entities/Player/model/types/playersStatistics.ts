import { Player } from "./playerStatistic";

export interface PlayersStatistics {
  count: number;
  pages_count: number;
  current_page: number;
  players: Array<Player>;
}

export interface PlayersStatisticsSchema {
  playersStatistics?: PlayersStatistics | null;
  isLoading?: boolean;
  error?: string;
}
