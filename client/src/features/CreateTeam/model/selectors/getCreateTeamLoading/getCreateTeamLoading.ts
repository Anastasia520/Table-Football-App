import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreateTeamLoading = (state: StateSchema) =>
  state?.createTeam?.isLoading || false;
