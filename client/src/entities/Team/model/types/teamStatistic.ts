export interface Team {
  id: string;
  name: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRatio: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
