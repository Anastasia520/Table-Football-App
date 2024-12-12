import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreateTeamError = (state: StateSchema) =>
  state?.createTeam?.error || null;
