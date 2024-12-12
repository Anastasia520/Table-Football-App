import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreateGameLoading = (state: StateSchema) =>
  state?.createPlayer?.isLoading || false;
