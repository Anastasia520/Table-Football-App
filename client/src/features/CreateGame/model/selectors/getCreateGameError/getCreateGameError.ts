import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getCreateGameError = (state: StateSchema) =>
  state?.createPlayer?.error || null;
