import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getGameRequestLoading = (state: StateSchema) =>
  state?.gameRequest?.isLoading || false;
