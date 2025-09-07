// import Negatives from '@/pages/messages-notes/Negatives.jsx'
// import Positives from '@/pages/messages-notes/Positives.jsx'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import Beta from "@/pages/Beta.jsx";
import store from "@/store/store.js";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import NotFound404 from "./pages/NotFound404.jsx";
import { routeTree } from "./routeTree.gen.js";

const router = createRouter({
  routeTree,
   defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
  defaultNotFoundComponent: () => {
    return (<NotFound404 />);
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <TanStackRouterDevtools router={router} />
        <Toaster />
      </ThemeProvider>
    </Suspense>
  </Provider>
);

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker
        .register("/sw.js", { type: "module" })
        .then((reg) => console.log("Service worker registered", reg))
        .catch((err) => console.error("Service worker registration failed", err));
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  });
}
