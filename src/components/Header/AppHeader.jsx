"use client";

import { ModeToggle } from "@/components/mode-toggle.jsx";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";

import { APP_NAME } from "../../../shared/app-variables.shared.js";
import { logoutUserSrv } from "../../services/auth.service.js";
import { logout } from "../../store/authSlice.js";

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
  const navigate = useNavigate({ from: "/" });
  const dispatch = useDispatch();
  async function handleLogout() {
    await logoutUserSrv();
    dispatch(logout());
    navigate({ to: "/auth/login" });
  }
  return (
    <section className="p-4  backdrop-blur-md sticky top-0 z-10 bg-background/80">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {" "}
          <img src="/assets/logo-dark.png" className="w-8 rounded " alt="Shadcn UI Navbar" />
          <span className="text-lg font-semibold tracking-tighter">{APP_NAME}</span>
        </Link>
        {/* // TODO: refactor Nav logic */}
        {/* <div className="@container flex flex-1 justify-start pl-8"><a href="https://tailwindcss.com/blog/vanilla-js-support-for-tailwind-plus" class="flex flex-nowrap items-center gap-2 rounded-full px-3 py-2 text-xs/4 whitespace-nowrap ring ring-gray-950/8 dark:ring-white/10 hover:bg-gray-950/2 hover:ring-gray-950/10 dark:hover:bg-white/5 dark:hover:ring-white/20 @max-[23rem]:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-4 fill-sky-500"><path fill-rule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clip-rule="evenodd"></path></svg><span class="font-medium">Now with vanilla JavaScript support</span><span class="size-0.75 rounded-full bg-current"></span><div class="flex gap-0.5"><span>Learn more</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="-mr-1 size-4 fill-gray-950/30 dark:fill-white/40"><path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg></div></a></div> */}
        <section className="flex gap-2 items-center">
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
                  <DropdownMenuItem>
                    <span className="container" onClick={handleLogout}>
                      Logout
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>New features coming soon...</DropdownMenuItem>
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              {/* <Link to="/auth/register">
                <Button>Register</Button>
              </Link> */}
            </div>
          )}
     <ModeToggle />
        
     
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
        </section>
      </nav>
    </section>
  );
};
