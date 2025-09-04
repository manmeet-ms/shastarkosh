import { createHourlyCheckinSrv } from "../src/services/user.service.js";

console.log("Service worker loaded ✅ :: sw.js");
// import {
//   cleanupOutdatedCaches,
//   createHandlerBoundToURL,
//   precacheAndRoute,
// } from "workbox-precaching";
// import { NavigationRoute, registerRoute } from "workbox-routing";

self.__WB_MANIFEST = [];
  
// {"title":"Test push message from DevTools","body":"Body from DevTools."}
self.addEventListener("push", (event) => {
  if (!event.data) {
    console.warn("Push event but no data.");
    return;
  }

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error("Failed to parse push data", e);
    return;
  }
  // const action = event.action;

  // if (!action) {
  //   event.waitUntil(
  //     clients.openWindow("/") // open your app's timeline view
  //   );}
  self.registration.showNotification(data.title || "sw.js Shastarkosh Title", {
    body: data.body || "sw.js A notification body",
    icon: data.icon || "./assets/logo.png",
    badge: data.badge || "./assets/logo.png",
    vibrate: [200, 100, 200],
    image: data.image || undefined,
    actions: data.actions || [],
  });

  // console.log("Push notification received", data);
});

// //  <reference lib="webworker" />

self.addEventListener("install", (event) => {
  console.log(event, "SW installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log(event, "SW activated");
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
  console.log(event);
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // console.log("Notif click raw:", event);   // 👈 did you actually see this in DevTools?
  // console.log("Notif action:", event.action);
  // console.log("Notif reply data:", event.reply);   // 👈 did you actually see this in DevTools?
  // Which action?
  const action = event.action;
  // console.log("Notification action clicked:", action);

  // Default behavior (clicked on body, not an action)
  if (!action) {
    event.waitUntil(
      clients.openWindow("/timeline") // open your app's timeline view
    );
    return;
  }

  // Handle specific action
  if (action === "write-up") {
    // Send API request to backend directly
   try {
    const datapyload={noteEntry:event.reply}

     event.waitUntil(
      createHourlyCheckinSrv(datapyload)
      // fetch(`${import.meta.env.VITE_BACKEND_URL}/users/hourly-checkins`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ note: "Quick check-in from notif", context: "Write" })
      // })
    );
   } catch (error) {
    console.log("sw.js", error);
    
   }
  }
});

// // self.__WB_MANIFEST is the default injection point
// precacheAndRoute(self.__WB_MANIFEST);

// // clean old assets
// cleanupOutdatedCaches();

// // TODO
// // /** @type {RegExp[] | undefined} */
// // let allowlist;
// // // in dev mode, we disable precaching to avoid caching issues
// // if (import.meta.env.DEV) allowlist = [/^\/$/];
// // to allow work offline
// registerRoute(
//   new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
// );

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "punisher-sync") {
    event.waitUntil(checkOfflinePunishmentLogic());
  }
});

async function checkOfflinePunishmentLogic() {
  const clientsList = await self.clients.matchAll();
  clientsList.forEach((client) => {
    client.postMessage({ type: "PUNISHMENT_CHECK" });
  });
}
