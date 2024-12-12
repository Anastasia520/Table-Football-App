import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamsStatisticsRequestError = (state: StateSchema) =>
  state?.teamsStatisticsRequest?.error || null;
