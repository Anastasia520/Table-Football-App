import { RouteProps } from "react-router-dom";
import { HomePage } from "../../../pages/HomePage";
import { NotFoundPage } from "../../../pages/NotFoundPage";
import { DashboardPage } from "../../../pages/DashboardPage";
import { TeamPage } from "../../../pages/TeamPage";
import { PlayerPage } from "../../../pages/PlayerPage";
import { GamePage } from "../../../pages/GamePage";

export enum AppRoutes {
  HOME = "home",
  DASHBOARD = "dashboard",
  TEAM = "team",
  PLAYER = "player",
  GAME = "game",
  NOT_FOUND = "not_found",
}

export const RouterPaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.DASHBOARD]: "/dashboard",
  [AppRoutes.TEAM]: "/team/:id",
  [AppRoutes.PLAYER]: "/player/:id",
  [AppRoutes.GAME]: "/game/:id",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RouterPaths.home,
    element: <HomePage />,
  },

  [AppRoutes.DASHBOARD]: {
    path: RouterPaths.dashboard,
    element: <DashboardPage />,
  },

  [AppRoutes.TEAM]: {
    path: RouterPaths.team,
    element: <TeamPage />,
  },

  [AppRoutes.PLAYER]: {
    path: RouterPaths.player,
    element: <PlayerPage />,
  },

  [AppRoutes.GAME]: {
    path: RouterPaths.game,
    element: <GamePage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RouterPaths.not_found,
    element: <NotFoundPage />,
  },
};
