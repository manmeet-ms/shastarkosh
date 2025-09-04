// import Negatives from '@/pages/messages-notes/Negatives.jsx'
// import Positives from '@/pages/messages-notes/Positives.jsx'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Beta from "@/pages/Beta.jsx";
import store from "@/store/store.js";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home  from "./pages/Home.jsx";
import App from "./App.jsx";
import Login from "./components/Auth/Login.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Landing from "./pages/Landing.jsx";
import NotFound404 from "./pages/NotFound404.jsx";
import Shastars from "./pages/Shastars.jsx";
import ShastarDetailPage from "./components/ShastarDetailPage.jsx";
import ForumPostDetails from "./pages/ForumPostDetails.jsx";

//  logger("console.logomport.meta.env);

// console.log(
// VITE_BACKEND_URL = ${import.meta.env.VITE_BACKEND_URL.slice(0, 15)},
// MONGO_URI = ${import.meta.env.MONGO_URI.slice(0, 15)},
// VITE_DISCORD_WEBHOOK_URL = ${import.meta.env.VITE_DISCORD_WEBHOOK_URL.slice(0, 15)},
// `);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      { path: "shastars", element: <Shastars /> },
      { path: "shastar/:sId", element: <ShastarDetailPage /> },
      { path: "post/:pId", element: <ForumPostDetails /> },
      { path: "questions", element: <Beta /> },
      { path: "q/:qId", element: <Beta /> },
      { path: "account", element: <Beta /> },
      { path: "categories", element: <Beta /> },
      { path: "discussions", element: <Beta /> },

      { path: "beta", element: <Beta /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Login /> },

  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "landing", element: <Landing /> },
  { path: "*", element: <NotFound404 /> },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
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
