export interface Player {
  id: string;
  name: string;
  games_played?: number;
  wins?: number;
  losses?: number;
  win_ratio?: number;
  goals_for?: number;
  goals_against?: number;
  goal_difference?: number;
}
