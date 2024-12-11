import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamStatisticsRequestError = (state: StateSchema) =>
  state?.teamStatisticsRequest?.error || null;
