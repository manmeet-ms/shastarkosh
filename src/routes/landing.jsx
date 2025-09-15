import { HeroRed } from "@/components/raycast-animated-background.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      
      <section>
        <HeroRed />
      <h1 className=" relative font-mono text-8xl uppercase">For those who can't focus</h1>

      </section>
          </>
  );
}
