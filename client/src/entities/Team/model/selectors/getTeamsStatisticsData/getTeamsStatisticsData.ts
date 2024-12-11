import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamsStatisticsData = (state: StateSchema) =>
  state.teamsStatistics || null;
