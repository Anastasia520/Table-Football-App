import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayerStatisticsRequestError = (state: StateSchema) =>
  state?.playerStatisticsRequest?.error || null;
