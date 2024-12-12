import { GameStatus } from "../../../../entities/Game";

export interface UpdateGameSchema {
  isLoading: boolean;
  error?: string;
  goals_team1?: number;
  goals_team2?: number;
  status?: GameStatus;
}
