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
