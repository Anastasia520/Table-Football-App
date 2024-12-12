export interface CreateTeamSchema {
  isLoading: boolean;
  error?: string;
  name: string;
  player1_id: string;
  player2_id?: string;
}
