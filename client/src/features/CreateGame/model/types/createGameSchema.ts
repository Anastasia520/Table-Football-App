export interface CreateGameSchema {
  isLoading: boolean;
  error?: string;
  team1_id: string;
  team2_id: string;
  status?: string;
  goals_team1?: number;
  goals_team2?: number;
}
