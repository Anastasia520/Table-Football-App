import { RouteProps } from "react-router-dom";
import { HomePage } from "../../../pages/HomePage";
import { NotFoundPage } from "../../../pages/NotFoundPage";
import { DashboardPage } from "../../../pages/DashboardPage";

export enum AppRoutes {
  HOME = "home",
  DASHBOARD = "dashboard",
  NOT_FOUND = "not_found",
}

export const RouterPaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.DASHBOARD]: "/dashboard",
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

  [AppRoutes.NOT_FOUND]: {
    path: RouterPaths.not_found,
    element: <NotFoundPage />,
  },
};
