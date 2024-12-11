import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamStatisticsRequestLoading = (state: StateSchema) =>
  state?.teamStatisticsRequest?.isLoading || false;
