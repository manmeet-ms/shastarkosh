import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from "../components/Header/LandingHeader";
import LandingFooter from "../components/Footer/LandingFooter";

export const Route = createFileRoute('/changelog')({
  component: RouteComponent,
})
const timelineData = [
  {
    date: "Jan 2025",
    title: "Shastarkosh Platform Launch",
    content:
      "Launched the Shastarkosh digital library platform, providing access to ancient Indian scriptures, weapons documentation, and historical texts. Initial collection includes the Vedas, Upanishads, and comprehensive weapon catalogs with detailed metadata and imagery.",
  },
  {
    date: "Feb 2025",
    title: "Advanced Search & Filtering",
    content:
      "Implemented advanced search capabilities with multi-parameter filtering. Users can now search by origin, time period, culture, and tags. Added support for Sanskrit transliteration and cross-referencing between related texts and artifacts.",
  },
  {
    date: "Mar 2025",
    title: "Community Features & Discussions",
    content:
      "Introduced community discussion forums for each resource. Scholars and enthusiasts can now engage in meaningful conversations, share insights, and collaborate on research. Added user profiles, contribution tracking, and reputation system.",
  },
  {
    date: "Apr 2025",
    title: "Mobile App & Offline Access",
    content:
      "Released native mobile applications for iOS and Android. Users can now download resources for offline reading and study. Implemented progressive web app (PWA) support for seamless cross-platform experience with offline-first architecture.",
  },
];
function RouteComponent( ) {

  return (

    <>
  <LandingHeader/>
    
    <section className="bg-background py-32">
      <div className="container">
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          Shastarkosh Development Timeline
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
                {entry.date}
              </h5>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  <div
                    className="prose dark:prose-invert text-foreground"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
<LandingFooter/>
    
    </>

  )
}
