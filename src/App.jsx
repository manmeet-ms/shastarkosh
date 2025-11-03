//  first homepage of dashbord
import { AppHeader } from "@/components/Header/AppHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconHome2, IconUser } from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { SIDENAV_DASH } from "../shared/sidenav-items.shared.js";
import "./App.css";
import AuthModal from "./components/AuthModal.jsx";
import BottomNav from "./components/Footer/BottomNav.jsx";
import { fetchUser } from "./store/authSlice.js";

const App = () => {
  const pathname = useLocation().pathname; // useLocation().pathname if React Router
  const [open, setOpen] = useState();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch(fetchPoints());
    // toast.info("Our backend service might take upto 60s to start ")
    dispatch(fetchUser());
  }, [dispatch]);

  const dynamiSideNav = [
    {
      title: "My Contant",
      url: "/app",
      icon: IconHome2,
    },
  ];
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppHeader />

        {/* first homepage of dashbord */}
        <main className="flex ">
          <section className="hidden lg:flex lg:flex-col h-[90vh] flex-col justify-between lg:p-4">
            <nav className="flex flex-col min-w-48 max-h-screen space-y-4 ">
              <h1 className="uppercase font-medium text-xs px-2 text-muted-foreground/60">Application</h1>
              {SIDENAV_DASH.map(({ title, url, icon: Icon }) => {
                const isActive = pathname === url;
                return (
                  <Link
                    viewTransition
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
              {/* {dynamiSideNav.map(({ title, url, icon: Icon }) => {
                const isActive = pathname === url;
                return (
                  <Link viewTransition 
                  
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
              })} */}
            {user &&   <section className="flex flex-col space-y-2" >  <h1 className="uppercase font-medium text-xs px-2 mt-4 text-muted-foreground/80">User</h1>
               <Link
                viewTransition
                className={cn(
                  "my-0.5 rounded-lg py-2.25 pr-0 pl-3.5 text-sm font-medium transition-colors",
                  pathname === `/app/creator/${user?.username}/content`
                    ? "bg-primary text-primary-foreground"
                    : // ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      "text-muted-foreground hover:bg-muted/40"
                )}
                to={`/app/creator/${user?.username}`}>
                <IconUser className="mr-2 inline-flex size-4 items-center" />
                <span className="">Profile</span>
              </Link></section> }

            
            
            </nav>

            {/* <section className="" >
  <img className="relative  rounded-lg" src="/assets/npc.png" alt="" />
  <span className="absolte">dont be an NPC, take back control </span>
</section> */}

            {/* {authStatus && <LogoutButton className="bg-accent text-sm font-medium py-2 rounded-full" />} */}
            <div className="flex flex-wrap justify-center gap-3 items-center ">
              {" "}
              <Link className="text-xs hover:underline px-2 font-normal" to="/philosophy">
                Philosophy
              </Link>
              <Link className="text-xs hover:underline px-2 font-normal" to="/roadmap">
                Roadmap
              </Link>
              <Link className="text-xs hover:underline px-2 font-normal" to="/changelog">
                Changelog
              </Link>
              <Link className="text-xs hover:underline px-2 font-normal" to="/contact">
                Contact
              </Link>
            </div>
          </section>
          <section className="grow lg:border-l">
            <div className="   flex items-center justify-between gap-2 px-4">
              {/* <div className="hidden lg:flex lg:flex-col">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{Greet}</h4>
                <p className="leading-7 text-secondary-foreground text-sm opacity-40">{dayjs().format("MMM DD, YYYY hh:mm A")}</p>{" "}
              </div>{" "} */}
              {/* <Sheet  open={open} onOpenChange={setOpen}>
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
              </Sheet> */}
            </div>
            {/* Content area where components will render */}

            <ScrollArea className="h-[90vh]">
              {" "}
              <Outlet />
            </ScrollArea>
          </section>
        </main>

        <img src="/assets/footer-image.png" alt="" />

        <AuthModal />
        {/* <AppFooter /> */}
        <BottomNav />
      </ThemeProvider>
    </>
  );
};

export default App;
