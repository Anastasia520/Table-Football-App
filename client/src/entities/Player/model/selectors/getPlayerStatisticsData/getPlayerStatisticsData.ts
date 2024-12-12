import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayerStatisticsData = (state: StateSchema) =>
  state.playerStatistics || null;
