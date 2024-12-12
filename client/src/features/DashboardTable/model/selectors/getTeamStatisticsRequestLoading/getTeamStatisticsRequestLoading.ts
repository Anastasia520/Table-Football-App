import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getTeamsStatisticsRequestLoading = (state: StateSchema) =>
  state?.teamsStatisticsRequest?.isLoading || false;
