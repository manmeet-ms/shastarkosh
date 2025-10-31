import { Outlet, createRootRoute } from "@tanstack/react-router";

// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import App from "../App";

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
