import { Team } from "../../../Team";

export enum GameStatus {
  "ongoing",
  "completed",
}

export interface Game {
  id: string;
  team1_id: Team;
  team2_id: Team;
  goals_team1?: number;
  goals_team2?: number;
  status?: GameStatus;
  completed_at?: null;
}
