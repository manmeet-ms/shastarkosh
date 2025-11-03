import { ArrowUpRight, ChevronRight, ChevronUp } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { HeroRed } from "@/components/raycast-animated-background.tsx";
import { createFileRoute } from "@tanstack/react-router";

import LandingHeader from "@/components/Header/LandingHeader";
import LandingFooter from "@/components/Footer/LandingFooter";
import NeuralNetwork from "@/components/neural-network-hero.tsx";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
const DottedDiv = ({
  children,
  className,
}) => (
  <div className={cn("relative", className)}>
    <div className="-left-25 bg-muted absolute top-4 h-[1.5px] w-[115%]" />
    <div className="-left-25 bg-muted absolute bottom-4 h-[1.5px] w-[115%]" />
    <div className="-top-25 bg-muted absolute left-4 h-[130%] w-[1.5px]" />
    <div className="-top-25 bg-muted absolute right-4 h-[130%] w-[1.5px]" />
    <div className="bg-foreground absolute left-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute right-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] right-[12.5px] z-10 size-2 rounded-full" />
    {children}
  </div>
);
function RouteComponent() {
  return (
    <>
       
      <section className="">
        <LandingHeader/>
        {/* <HeroRed /> */}
       <NeuralNetwork />
 <section className="bg-background py-32">
      <div className="px-0! container relative flex flex-col items-center lg:pt-8">
        <DottedDiv>
          <div className="grid lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex w-full flex-col gap-8 px-10 py-20 md:px-14">
              <Badge
                variant="outline"
                className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-6 py-2 transition-all ease-in-out hover:gap-6"
              >
                <span className="text-muted-foreground text-sm font-medium tracking-tight">
                  Digital Library of Ancient Wisdom
                </span>
                <ChevronRight className="size-4!" />
              </Badge>
              <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
                Preserving
                <br />
                Ancient Indian
                <br />
                Heritage
              </h1>
              <p className="text-muted-foreground tracking-tight md:text-xl">
                Explore a comprehensive digital archive of Vedic scriptures, ancient weapons, and historical artifacts. Meticulously documented and accessible to scholars and enthusiasts worldwide.
              </p>
              <div className="flex w-full gap-2">
                <Button className="text-md bg-primary text-primary-foreground h-12 w-fit rounded-full px-10" asChild>
                  <a href="/app/resources">Explore Collection</a>
                </Button>
                <Button
                  variant="outline"
                  className="text-md h-12 w-12 rounded-full transition-all ease-in-out hover:rotate-45"
                  asChild
                >
                  <a href="/about"><ArrowUpRight /></a>
                </Button>
              </div>
            </div>
            {/* Right Content */}
            <DottedDiv className="group size-full place-self-end p-4 lg:w-4/6">
              <div className="bg-muted/50 group-hover:bg-muted relative h-full w-full p-4 transition-all ease-in-out">
                {/* Bg Image div */}
                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg"
                    alt="aiImage"
                    className="h-full w-full object-cover"
                  />
                  <div className="bg-linear-to-t absolute inset-0 from-black/70 to-transparent"></div>
                </div>

                <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                  <p className="text-background flex w-full items-center text-xl tracking-tighter">
                    1500 BCE <span className="bg-background mx-2 h-2.5 w-[1px]" />
                    Present
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-background text-center text-6xl font-semibold tracking-tight">
                      Vedic <br />
                      Scriptures
                    </h2>
                    <div className="bg-background mt-2 h-1 w-6 rounded-full" />
                    <p className="text-background/80 mt-10 max-w-sm px-2 text-center text-lg font-light leading-5 tracking-tighter">
                      Explore our comprehensive collection of ancient Vedic texts with translations and scholarly annotations.
                    </p>
                  </div>
                  <a
                    href="/app/resources?category=vedic-texts"
                    className="text-background group mb-6 flex cursor-pointer flex-col items-center justify-center"
                  >
                    <ChevronUp
                      size={30}
                      className="transition-all ease-in-out group-hover:-translate-y-2"
                    />
                    <p className="text-background text-xl tracking-tight">
                      View Collection
                    </p>
                  </a>
                </div>
              </div>
            </DottedDiv>
          </div>
        </DottedDiv>
      </div>
    </section>

    <section className="bg-muted/50 px-6 py-32">
      <div className="container">
        <div className="grid gap-9 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Badge variant="outline" className="bg-background gap-1.5">
              <span className="size-1.5 rounded-full bg-green-500" />
              Compliance
            </Badge>
            <h1 className="text-balance text-4xl font-medium lg:text-5xl">
              Comprehensive Digital Preservation
            </h1>
            <p className="text-muted-foreground text-lg">
              Our platform employs advanced digitization techniques and metadata standards to preserve ancient knowledge. Each resource includes detailed origin information, cultural context, and scholarly annotations for academic research.
            </p>
            <div className="flex items-center gap-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/GDPR.svg"
                alt="GDPR"
                className="h-22 opacity-50 grayscale md:h-28 dark:invert"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/CCPA.svg"
                alt="ISO-27001"
                className="h-22 opacity-60 grayscale md:h-28 dark:invert"
              />
            </div>
          </div>
          <div className="border-border bg-background rounded-2xl border">
            <div className="border-border relative overflow-hidden border-b p-6 lg:px-8 lg:py-11">
              <div>
                <h2 className="text-xl font-medium lg:text-2xl">
                  High-Resolution Imaging
                </h2>
                <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                  Advanced imaging technology captures every detail of ancient manuscripts and artifacts, preserving them in pristine digital format for future generations.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg"
                alt="ISO-27001"
                className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
              />
            </div>
            <div className="relative overflow-hidden p-6 lg:px-8 lg:py-11">
              <div>
                <h2 className="text-xl font-medium lg:text-2xl">
                  Scholarly Annotations
                </h2>
                <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                  Expert scholars provide detailed annotations, translations, and cultural context to enhance understanding and facilitate research.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27017.svg"
                alt="ISO-27001"
                className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
              />
            </div>
            <div className="border-border relative overflow-hidden border-t p-6 lg:px-8 lg:py-11">
              <div>
                <h2 className="text-xl font-medium lg:text-2xl">
                  Cross-Referencing System
                </h2>
                <p className="text-muted-foreground mt-2 w-3/4 pr-10 text-sm md:text-base">
                  Discover connections between related texts, artifacts, and historical periods through our comprehensive cross-referencing system.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27018.svg"
                alt="ISO-27001"
                className="text-muted-foreground absolute -bottom-7 right-4 size-24 opacity-80 grayscale lg:right-8 lg:size-32 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </section>


<LandingFooter/>        
      </section>
          </>
  );
}
