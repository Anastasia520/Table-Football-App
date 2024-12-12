import { GameStatus } from "../../../Game";
import { Player } from "../../../Player";

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
  player_1?: Player;
  player_2?: Player;
  goals_team?: number;
  games?: Array<TeamGame>;
}

export interface TeamGame {
  id: string;
  team1_id: Team;
  team2_id: Team;
  status: GameStatus;
}
