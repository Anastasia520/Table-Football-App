export interface Team {
  id: string;
  name: string;
  player1_id?: string;
  player2_id?: string;
  games_played?: number;
  wins?: number;
  losses?: number;
  win_ratio?: number;
  goals_for?: number;
  goals_against?: number;
  goal_difference?: number;
}
