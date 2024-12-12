import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreatePlayerLoading = (state: StateSchema) =>
  state?.createPlayer?.isLoading || false;
