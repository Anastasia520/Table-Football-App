import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayersStatisticsRequestError = (state: StateSchema) =>
  state?.playersStatisticsRequest?.error || null;
