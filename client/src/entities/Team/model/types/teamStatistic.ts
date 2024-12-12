export interface Team {
  id: string;
  name: string;
  player1_id?: string;
  player2_id?: string;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  winRatio?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
}
