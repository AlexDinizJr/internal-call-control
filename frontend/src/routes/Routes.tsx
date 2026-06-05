import { ROUTES } from "./Paths";
import { Calls } from "../pages/Calls";
import { Home } from "../pages/Home";
import { RegisterCall } from "../pages/RegisterCall";

export const publicRoutes = [
    {
        path: ROUTES.HOME,
        element: <Home />,
    },
    {
        path: ROUTES.CALLS,
        element: <Calls />,
    },
    {
        path: ROUTES.REGISTER_CALLS,
        element: <RegisterCall />,
    },
];