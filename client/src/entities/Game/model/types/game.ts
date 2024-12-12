export enum GameStatus {
  "ongoing",
  "completed",
}

export interface Game {
  id: string;
  team1_id: string;
  team2_id: string;
  goals_team1?: number;
  goals_team2?: number;
  status?: GameStatus;
  completed_at?: null;
}
