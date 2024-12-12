import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getPlayerStatisticsRequestLoading = (state: StateSchema) =>
  state?.playerStatisticsRequest?.isLoading || false;
