//  first homepage of dashbord
import { AppHeader } from "@/components/Header/AppHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { completeBlock, getTodayBlocks } from "@/services/timeblock.service";
import dayjs from "dayjs";
import { FlameKindlingIcon, PanelLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { SIDENAV_DASH } from "../shared/app-variables.shared.js";
import "./App.css";
import BottomNav from "./components/Footer/BottomNav.jsx";
import RitualInputForm from "./components/Forms/RitualInputForm.jsx";
import UrgeInputForm from "./components/Forms/UrgeInputForm.jsx";
import MoodTrackerLoggerButton from "./components/MoodTrackerLoggerButton.jsx";
import { subscribeToPushSrv } from "./services/notification.service.js";
import { flushRituals } from "./services/ritual.service";
import { flushBlocks, initTimeBlocksSrv } from "./services/timeblock.service";
import { flushViolations } from "./services/violation.service";
import { startOfflinePunisher } from "./utils/offline-punisher.js";
import { saveScheduleOffline } from "./utils/sync.utils.js";

const App = () => {
  const date = new Date();
  const hours = date.getHours();
  let Greet;

  if (hours < 12) {
    Greet = "Good Morning";
  } else if (hours >= 12 && hours <= 17) {
    Greet = "Good Afternoon";
  } else if (hours >= 17 && hours <= 24) {
    Greet = "Good Evening";
  }

  // const baseURLAppJsx="http://localhost:3000/api"
  const baseURLAppJsx = import.meta.env.VITE_BACKEND_URL;
  //   console.log(import.meta.env.VITE_BACKEND_URL);

  const [blocks, setBlocks] = useState([]);
  const [ritual, setRitual] = useState([]);

  const [activeBlockId, setActiveBlockId] = useState(null);
  const [stats, setStats] = useState(null);
  const [violations, setViolations] = useState([]);
  const [vow, setVow] = useState("");
  const [submitted, setSubmitted] = useState(false);

  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.type === "PUNISHMENT_CHECK") {
      startOfflinePunisher();
    }
  });
  if ("serviceWorker" in navigator && "periodicSync" in navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.periodicSync.register("punisher-sync", {
        minInterval: 15 * 60 * 1000, // 15 mins
      });
    });
  }
  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const getVAPIDKey = async () => {
    // const res = await fetch(`https://jathedarbe.onrender.com/api/notifications/public-key`);
    // const data = await res.json();
    // console.log(data);
    // return data.publicKey;
    try {
      const data = await api.get("/notifications/public-key");
      return data.data.publicKey;
    } catch (error) {
      console.log("error is app.jsx :: getVAPIDKey()", error);
    }
  };

  // set to true if user resisted/overcame the urg
  const subscribeToPush = async () => {
    const sw = await navigator.serviceWorker.ready;
    const vapidPublicKey = await getVAPIDKey();

    const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    try {
      // await fetch(`${baseURLAppJsx}/notifications/subscribe`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(subscription),
      // });
      subscribeToPushSrv(subscription);
    } catch (error) {
      console.log("error is app.jsx :: subscribeToPush()", error);
    }

    // Save subscription to backend

    console.log("Subscribed!");
  };

  useEffect(() => {
    startOfflinePunisher();
    subscribeToPush();
    initTimeBlocksSrv();

    const existing = localStorage.getItem("ritual_checkin_" + dayjs().format("YYYY-MM-DD"));
    if (existing) {
      setVow(existing);
      setSubmitted(true);
    }

    api.get("/analytics/summary").then((res) => setStats(res.data));
    api.get("/violations").then((res) => setViolations(res.data));
  }, []);

  const nukeCollections = () => {
    try {
      flushBlocks();
      flushRituals();
      flushViolations();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComplete = async (id) => {
    await completeBlock(id);
    const res = await getTodayBlocks();
    setBlocks(res.data); // refresh
  };

  useEffect(() => {
    const checkActiveBlock = () => {
      const now = dayjs();
      const currentTime = now.format("HH:mm");

      const active = blocks.find((block) => {
        const start = block.start || block.startTime;
        const end = block.end || block.endTime;
        return currentTime >= start && currentTime < end;
      });

      setActiveBlockId(active?._id || null);
    };

    checkActiveBlock();
    const interval = setInterval(checkActiveBlock, 60 * 1000);
    return () => clearInterval(interval);
  }, [blocks]);

  const pathname = useLocation().pathname; // useLocation().pathname if React Router
  saveScheduleOffline(blocks, ritual);
  const [open, setOpen] = useState();
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppHeader />
        {/* <a href="#" onClick={signOut}>Sign out</a>
        <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
        {/* <Button
          onClick={() =>
            sendTestNotification({
              title: "Hello my much anticipated notification",
              sound: "./assets/nottifs/audio/roadrunner.mp3",
              body: "data.body",
              icon: "./assets/logo.png",
              badge: "./assets/logo.png",
              vibrate: [200, 100, 200],
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
              actions: [
                {
                  action: "coffee-action",
                  type: "button",
                  title: "Buy",
                },
                {
                  action: "doughnut-action",
                  type: "button",
                  // type: 'text',
                  title: "Drop",
                },
              ],
            })
          }>
          Trigger notif #4
          <BellIcon />{" "}
        </Button> */}
        {/* first homepage of dashbord */}
        <main className="flex">
          <section className="hidden lg:flex lg:flex-col h-[90vh] flex-col justify-between lg:p-4">
            <nav className="flex flex-col min-w-48 max-h-screen space-y-4 ">
              {SIDENAV_DASH.map(({ title, url, icon: Icon }) => {
                const isActive = pathname === url;
                return (
                  <Link
                    className={cn(
                      "my-0.5 rounded-lg py-2.25 pr-0 pl-3.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : // ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          "text-muted-foreground hover:bg-muted/40"
                    )}
                    key={url}
                    to={url}>
                    <Icon className="mr-2 inline-flex size-4 items-center" />
                    <span className="">{title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* <section className="" >
  <img className="relative  rounded-lg" src="/assets/npc.png" alt="" />
  <span className="absolte">dont be an NPC, take back control </span>
</section> */}
            <div className="  bottom-4 flex flex-col gap-4">
              <section className="relative   flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-6  pt-40 max-w-sm  mt-24">
                <img src="/assets/npc.png" className=" absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-xl font-medium  ">Don't be an NPC</h3>
                <div className="z-10 gap-y-1  text-sm leading-6 text-accent-foreground/60"> It's fatal, take back control</div>
              </section>
            </div>
            {/* {authStatus && <LogoutButton className="bg-accent text-sm font-medium py-2 rounded-full" />} */}
          </section>

          <section className="grow lg:border-l">
            <div className="changed-px pb-4 flex items-center justify-between gap-2 px-4">
              <div className="hidden lg:flex lg:flex-col">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{Greet}</h4>
                <p className="leading-7 text-secondary-foreground text-sm opacity-40">{dayjs().format("MMM DD, YYYY hh:mm A")}</p>{" "}
              </div>{" "}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                  <PanelLeftIcon size={20} className="block lg:hidden" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription className="flex min-w-48 flex-col space-y-4 py-8 lg:flex">
                      {SIDENAV_DASH.map(({ title, url, icon: Icon }) => {
                        const isActive = pathname === url;
                        return (
                          <Link
                            className={cn(
                              "my-0.5 rounded-lg py-2.25 pr-0 pl-3.5 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : // ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                  "text-muted-foreground hover:bg-muted/40"
                            )}
                            key={url}
                            to={url}>
                            <Icon className="mr-2 inline-flex size-4 items-center" />
                            <span className="">{title}</span>
                          </Link>
                        );
                      })}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <div className="flex gap-2">
                <RitualInputForm /> <UrgeInputForm refetchUrges={() => 0} />
                <MoodTrackerLoggerButton />
                <Button className="hidden md:inline-flex" variant="outline">
                  {/* // TODO:   triggers erros res.data.filter */}
                  {/* <Button onClick={checkForPunishments()} variant="outline"> */}
                  <FlameKindlingIcon />
                  Punishments
                </Button>
              </div>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Mood Tracker
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Log Urges
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Add Ritual
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Check Punishments
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Invite users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      New Team
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
            {/* Content area where components will render */}

            <ScrollArea className="h-screen">
              {" "}
              <Outlet />
            </ScrollArea>
          </section>
        </main>

        {/* <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={nukeCollections}>
            <FolderXIcon /> Nuke Collections
          </Button>
          <Button variant="outline" onClick={() => flushBlocks()}>
            <ShredderIcon /> Flush collection
          </Button>
          <Button variant="outline" onClick={() => flushRituals()}>
            <SparklesIcon /> Flush Rituals
          </Button>
          <Button variant="outline" onClick={() => flushViolations()}>
            <FileBadge2Icon /> Flush Violations
          </Button>
        </div> */}
        {/* <AppFooter /> */}
        <BottomNav />
      </ThemeProvider>
    </>
  );
};

export default App;
