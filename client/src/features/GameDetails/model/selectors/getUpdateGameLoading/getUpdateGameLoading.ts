import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getUpdateGameLoading = (state: StateSchema) =>
  state?.updateGame?.isLoading || false;
