//  first homepage of dashbord
import { AppHeader } from "@/components/Header/AppHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PanelLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import { SIDENAV_DASH } from "../shared/app-variables.shared.js";
import "./App.css";
import BottomNav from "./components/Footer/BottomNav.jsx";
import { fetchUser } from "./store/authSlice.js";

const App = () => {
 

  const pathname = useLocation().pathname; // useLocation().pathname if React Router
  const [open, setOpen] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchPoints());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppHeader /> 
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
           
            {/* {authStatus && <LogoutButton className="bg-accent text-sm font-medium py-2 rounded-full" />} */}
          </section>

          <section className="grow lg:border-l"> 
            <div className="changed-px pb-4 flex items-center justify-between gap-2 px-4">
              {/* <div className="hidden lg:flex lg:flex-col">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{Greet}</h4>
                <p className="leading-7 text-secondary-foreground text-sm opacity-40">{dayjs().format("MMM DD, YYYY hh:mm A")}</p>{" "}
              </div>{" "} */}
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

             
            </div>
            {/* Content area where components will render */}

            <ScrollArea className="h-screen">
              {" "} 
              <Outlet />
            </ScrollArea>
          </section>
        </main>

        <div className="flex justify-end gap-2">
         
        </div>
        {/* <AppFooter /> */}
        <BottomNav />
      </ThemeProvider>
    </>
  );
};

export default App;
