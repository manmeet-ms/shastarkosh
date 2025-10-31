import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import SectionTitleSubTitle from "@/components/SectionTitleSubTitle.jsx";
import ShastarCard from "@/components/ShastarCard.jsx";
import { getShastarSrv } from "@/services/shastarInfo.service.js";

export const Route = createFileRoute("/app/shastars/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [shastars, setShastars] = useState([]);
  const getShastarsListinfo = async () => {
    const resShastars = await getShastarSrv(50);

    setShastars(resShastars.data.data);
    console.log("resShastars", shastars);
  };
  useEffect(() => {
    getShastarsListinfo();
  }, []);

  return (
    <section className="text-muted-foreground/60 body-font">
      <div className="container px-4  mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <div className="flex justify-between items-center">
            <SectionTitleSubTitle title="Shastar" subtitle={"${shastars.length} shastars"} />
            <Button>
              <Link to="/app/shastars/create">Create Shastar</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  -m-2">
          {shastars.map((shastar) => (
            <ShastarCard key={shastar._id} {...shastar} />
          ))}
        </div>
      </div>
    </section>
  );
}
