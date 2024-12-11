import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayersStatisticsRequestLoading = (state: StateSchema) =>
  state?.playersStatisticsRequest?.isLoading || false;
