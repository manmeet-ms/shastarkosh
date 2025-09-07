"use client";

import { ModeToggle } from "@/components/mode-toggle.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { APP_NAME } from "../../../shared/app-variables.shared.js";
import { getUserSrv } from "../../services/user.service.js";

export const AppHeader = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log("AppHeader :: user", user, user?.id);
  // console.log("user as obj", { user });

  // const [userProfile, setUserProfile] = useState();
  // async function getUserProfile() {
  //   const userRes = await getUserSrv(user.id);
  //   console.log("userRes.data", userRes.data);
  //   setUserProfile(userRes.data);
  // }

  // useEffect(() => {
  //   getUserProfile();
  //   if (user && user.id) {
  //     getUserSrv(user.id).then((userRes) => {
  //       setUserProfile(userRes.data);
  //     });
  //   }
  // }, [user]);

  return (
    <section className="p-4  backdrop-blur-md sticky top-0 z-10 bg-background/80">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {" "}
          <img src="/logo.png" className="bg-white rounded p-1.5 py-2" alt="Shadcn UI Navbar" />
          <span className="text-lg font-semibold tracking-tighter">{APP_NAME}</span>
        </Link>
        {/* // TODO: refactor Nav logic */}
        <section className="flex   items-center">
          {user ? (
            <div className="flex ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img className="rounded-full w-6" src={user.avatar} alt={user.name} />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
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
          <ModeToggle />
        </section>
      </nav>
    </section>
  );
};
