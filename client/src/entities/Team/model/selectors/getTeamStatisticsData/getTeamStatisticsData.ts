import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamStatisticsData = (state: StateSchema) =>
  state.teamStatistics || null;
