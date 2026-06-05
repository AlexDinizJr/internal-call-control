import { NotFound } from "../pages/NotFound";
import { ROUTES } from "./Paths";

export const fallbackRoutes = [
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];