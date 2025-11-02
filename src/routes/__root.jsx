import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AIChatPanel } from "@/components/AIChatPanel";

// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <Outlet />
    <AIChatPanel />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
