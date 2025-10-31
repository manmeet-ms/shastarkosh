import { HeroRed } from "@/components/raycast-animated-background.tsx";
import { createFileRoute } from "@tanstack/react-router";

import LandingHeader from "@/components/Header/LandingHeader";
import LandingFooter from "@/components/Footer/LandingFooter";
import NeuralNetwork from "@/components/neural-network-hero.tsx";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
       
      <section className="">
        <LandingHeader/>
        {/* <HeroRed /> */}
       <NeuralNetwork />
     
<LandingFooter/>        
      </section>
          </>
  );
}
