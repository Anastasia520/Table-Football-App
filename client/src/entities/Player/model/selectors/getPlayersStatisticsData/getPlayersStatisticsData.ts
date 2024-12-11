import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayersStatisticsData = (state: StateSchema) =>
  state.playersStatistics || null;
