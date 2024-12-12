import { StateSchema } from "../../../../../app/providers/StoreProvider";

export const getGameRequestError = (state: StateSchema) =>
  state?.gameRequest?.error || null;
