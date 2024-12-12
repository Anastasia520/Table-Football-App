import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getUpdateGameError = (state: StateSchema) =>
  state?.updateGame?.error || null;
