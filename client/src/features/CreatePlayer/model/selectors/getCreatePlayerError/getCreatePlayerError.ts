import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreatePlayerError = (state: StateSchema) =>
  state?.createPlayer?.error || null;
