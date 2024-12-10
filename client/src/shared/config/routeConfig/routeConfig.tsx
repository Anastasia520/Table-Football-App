import { RouteProps } from "react-router-dom";
import { HomePage } from "../../../pages/HomePage";
import { NotFoundPage } from "../../../pages/NotFoundPage";

export enum AppRoutes {
  HOME = "home",
  NOT_FOUND = "not_found",
}

export const RouterPaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RouterPaths.home,
    element: <HomePage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RouterPaths.not_found,
    element: <NotFoundPage />,
  },
};
