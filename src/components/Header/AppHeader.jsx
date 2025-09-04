"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IconBolt, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DotIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { APP_NAME } from "../../../shared/app-variables.shared.js";
import { getUserSrv } from "../../services/user.service.js";

export const AppHeader = () => {

  const { user } = useSelector((state) => state.auth);
  // console.log("user", user);
  // console.log("user as obj", { user });

  const [userProfile, setUserProfile] = useState();
  async function getUserProfile() {
    const userRes = await getUserSrv(user.id);
    // console.log(userRes.data);
    setUserProfile(userRes.data);
  }

  
  useEffect(() => {
    if (user && user.id) {
      getUserSrv(user.id).then((userRes) => {
        setUserProfile(userRes.data);
      });
    }
  }, [user]);
  // const [userAuthDataRedux, setUserAuthDataRedux] = useState({});

  // const dispatch = useDispatch();
  // const { user, loading } = useSelector((state) => state.auth);
  // const points = useSelector((state) => state.points.value);
  // useEffect(() => {
  //   dispatch(fetchUser())
  //     .then((data) => {
  //       console.log("Data loaded Redux under dispatch:", data);

  //       setUserAuthDataRedux(data.payload.user);
  //       // console.log(data.payload.user);
  //     })
  //     .catch((err) => console.error("Failed:", err));
  // }, [dispatch]);
  // // console.log("userData Redux state, loading",userAuthDataRedux, loading);

  // // console.log("userData Reduc, loading", user, loading); // const baseURLAppJsx="http://localhost:3000/api"

  // useEffect(() => {
  //   if (!userAuthDataRedux?.id) return; // skip if ID not ready

  //   const getuserdaataservice = async () => {
  //     try {
  //       // console.log("userAuthDataRedux.id userAuthDataRedux.id userAuthDataRedux.id", userAuthDataRedux.id);
  //       // console.log(userAuthDataRedux);
  //       const userResFe = await getUserSrv(userAuthDataRedux.id);
  //       // console.log("Fetched DB data:", userResFe.data);
  //       setUserDetailsDB(userResFe.data);
  //       // console.log("userDetailsDB userDetailsDB userDetailsDB", userDetailsDB);
  //     } catch (err) {
  //       console.error("DB fetch failed:", err);
  //     }
  //   };

  //   getuserdaataservice();
  // }, [userAuthDataRedux]);
  // console.log("userDetailsDB", userDetailsDB);

  const features = [
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "#",
    },
    {
      title: "Analytics",
      description: "Track your performance",
      href: "#",
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      href: "#",
    },
    {
      title: "Integrations",
      description: "Connect with other tools",
      href: "#",
    },
    {
      title: "Storage",
      description: "Manage your files",
      href: "#",
    },
    {
      title: "Support",
      description: "Get help when needed",
      href: "#",
    },
  ];

  return (
    <section className="p-4 sticky top-0 z-10 bg-background">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {" "}
          <img src="/logo.png" className="bg-white rounded p-1.5 py-2" alt="Shadcn UI Navbar" />
          <span className="text-lg font-semibold tracking-tighter">{APP_NAME}</span>
        </Link>
        {/* // TODO: refactor Nav logic */}
        <section className="flex gap-2 items-center">
          {/* <NavigationMenu className="hidden items-center gap-2 lg:flex">
    <NavigationMenuList>
      <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent>
      <div className="grid w-[600px] grid-cols-2 p-3">
        {features.map((feature, index) => (
        <NavigationMenuLink
        href={feature.href}
        key={index}
        className="hover:bg-muted/70 rounded-md p-3 transition-colors">
        <div key={feature.title}>
          <p className="text-foreground mb-1 font-semibold">
          {feature.title}
          </p>
          <p className="text-muted-foreground text-sm">
          {feature.description}
          </p>
        </div>
        </NavigationMenuLink>
        ))}
      </div>
      </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink
      href="/philosophy"
      className={navigationMenuTriggerStyle()}>
      Philosophy
      </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink
      href="#"
      className={navigationMenuTriggerStyle()}>
      Changelog
      </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink
      href="/contact"
      className={navigationMenuTriggerStyle()}>
      Contact
      </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
    </NavigationMenu> */}
          {/* <Button variant="outline">Sign in</Button>
    <Button>Start for free</Button> */}

          {user ? (
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger>
                  {" "}
                  <span variant="icon" className="text-sm flex justify-center items-center px-3  gap-1.5  py-2   rounded-full bg-card    border border-accent ">
                    <IconBolt size={16} />
                    {/* TODO: add the optiomization to add background job that periodically syncs with backd, since there will be many many evern tsin the whole day, so we need to minise the backedn calls */}
                    {Number.parseFloat(points ?? 0).toFixed(2)}
                  </span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      Points Ledger 
                      <br /> 
                      <span className="font-normal text-xs text-secondary-foreground/40" >Total Entries till {dayjs(new Date()).format("DD MMM, YYYY")} - {pointsLedgerFe.length}</span>
                      {/* //TODO Download CSV */}
                      {/* type
points
balanceAfter
timestamps[] */}
                    </SheetTitle>
                    <SheetDescription>
                      <ScrollArea className="h-screen ">
                        <ol className="  ">
                          {pointsLedgerFe
                            ? pointsLedgerFe.reverse().map((entry, idx) => (
                                <li key={idx} className="border-b py-2  flex items-center justify-between  ">
                                  <div>
                                    <div className="flex gap-4 items-center  justify-start">
                                      <span className="opacity-30">#{idx +1}</span>
                                      <div>
                                        <Badge variant="outline" className="border-0 px-0 ">
                                          {entry.type.includes("credit")}

                                          {entry.type.includes("credit".toUpperCase()) ? <IconTrendingUp className="text-green-400" /> : <IconTrendingDown className="text-red-400" />}
                                          {entry.type.replace(/_/g, " ")}
                                          <DotIcon className="inline -mx-1     " />
                                          <span className={cn("  text-sm font-normal leading-none ", entry.balanceAfter - entry.points > 0 ? "text-green-400" : "text-red-400")}>{entry.balanceAfter - entry.points}</span>
                                        </Badge>{" "}
                                        <p className="text-xs pl-4 text-secondary-foreground/40">
                                          Balance{" "}
                                          <span className="text-secondary-foreground/40 font-medium">
                                            {entry?.points} → {entry?.balanceAfter}
                                          </span>
                                        </p>
                                      </div>{" "}
                                    </div>{" "}
                                  </div>
                                  <div className="flex flex-col items-end text-xs text-secondary-foreground/40">
                                    <span>{dayjs(entry.createdAt).format("DD MMM")}</span>
                                    <span>{dayjs(entry.createdAt).format("hh:mm a")}</span>
                                  </div>
                                </li>
                              ))
                            : null}
                        </ol>
                      </ScrollArea>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img className="rounded-full w-8" src={userProfile?.avatar} alt={userProfile?.name} />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userProfile?.name}</span>
                      <span className="truncate text-xs">{userProfile?.email}</span>
                      <span className="truncate text-xs font-medium"> {/* Last login <span>{dayjs(userDetailsDB.accessedAt).format()} </span> */}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>New features coming soon...</DropdownMenuItem>
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link target="_blank" to={`${import.meta.env.VITE_BACKEND_URL}/auth/discord/login`}>
              {/* <Button>Login with Discord</Button> */}
            </Link>
          )}

          {/* <Sheet className="lg:hidden" >
    <SheetTrigger asChild>

      <MenuIcon className="inline-flex h-4 w-4" />

    </SheetTrigger>
    <SheetContent side="top" className="max-h-screen overflow-auto">
      <SheetHeader>
      <SheetTitle>
      <a
        href="https://www.shadcnblocks.com"
        className="flex items-center gap-2">
        <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
        className="max-h-8"
        alt="Shadcn UI Navbar"
        />
        <span className="text-lg font-semibold tracking-tighter">
        Shadcnblocks.com
        </span>
      </a>
      </SheetTitle>
      </SheetHeader>
      <div className="flex flex-col p-4">
      <Accordion type="single" collapsible className="mt-4 mb-2">
      <AccordionItem value="solutions" className="border-none">
        <AccordionTrigger className="text-base hover:no-underline">
        Features
        </AccordionTrigger>
        <AccordionContent>
        <div className="grid md:grid-cols-2">
        {features.map((feature, index) => (
          <a
          href={feature.href}
          key={index}
          className="hover:bg-muted/70 rounded-md p-3 transition-colors">
          <div key={feature.title}>
          <p className="text-foreground mb-1 font-semibold">
            {feature.title}
          </p>
          <p className="text-muted-foreground text-sm">
            {feature.description}
          </p>
          </div>
          </a>
        ))}
        </div>
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-4">
      <a href="#" className="font-medium">
        Templates
      </a>
      <a href="#" className="font-medium">
        Blog
      </a>
      <a href="#" className="font-medium">
        Pricing
      </a>
      </div>
      <div className="mt-6 flex flex-col gap-2">
      <Button variant="outline">Sign in</Button>
      <Button>Start for free</Button>
      </div>
      </div>
    </SheetContent>
    </Sheet> */}
          {/* <ModeToggle /> */}
        </section>
      </nav>
    </section>
  );
};
