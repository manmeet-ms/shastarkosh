"use client";

import { MenuIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import { APP_NAME } from "../../../shared/app-variables.shared";
import { useSelector } from "react-redux";

const LandingHeader = () => {
  const features = [
    {
      title: "Shastars",
      description: "Explore ancient weapons and tools",
      href: "/app/shastars",
    },
    {
      title: "Forum Posts",
      description: "Join discussions about martial arts",
      href: "/app/posts",
    },
    {
      title: "Resources",
      description: "Educational materials and guides",
      href: "/app/resources",
    },
    {
      title: "Categories",
      description: "Browse organized content",
      href: "/app/categories",
    },
    {
      title: "AI Assistant",
      description: "Get help from our AI",
      href: "/app",
    },
    {
      title: "Community",
      description: "Connect with practitioners",
      href: "/app/posts",
    },
  ];
const navigate=useNavigate()
const {user}=useSelector((state)=>state.auth)
if (user) {
navigate({to:"/app"})  
}
 else{
   return (
    <section className="bg-black/20 backdrop-brightness-20 px-4 backdrop-blur-2xl sticky top-0 z-10 py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2"
          >
            <img
              src="/logo/transparent/transparent-shastarkosh-logo-dark.png"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
            <span className="text-lg font-semibold -ml-1.5 tracking-tighter">
             {APP_NAME}
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={feature.title}>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
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
                  href="/app/shastars"
                  className={navigationMenuTriggerStyle()}
                >
                  Shastars
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/app/posts"
                  className={navigationMenuTriggerStyle()}
                >
                  Forum
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/app/resources"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline"> <Link to={"/auth/login"} >Login</Link> </Button>
            <Button>
              <Link to={"/auth/register"} >Register</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    to="/"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="/logo/transparent/transparent-shastarkosh-logo-dark.png"
                      className="max-h-8"
                      alt="Shastarkosh Logo"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      {APP_NAME}
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="explore" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Explore
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1">
                        {features.map((feature, index) => (
                          <Link
                            to={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <Link to="/app/shastars" className="font-medium">
                    Shastars
                  </Link>
                  <Link to="/app/posts" className="font-medium">
                    Forum
                  </Link>
                  <Link to="/app/resources" className="font-medium">
                    Resources
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline"><Link to="/auth/login">Login</Link></Button>
                  <Button><Link to="/auth/register">Register</Link></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
 }
};

export default LandingHeader;
