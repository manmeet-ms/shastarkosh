import { Button } from "@/components/ui/button";
import { IconArrowRight, IconHeart, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import millify from "millify";
import { useEffect, useState } from "react";

import SectionTitleSubTitle from "../../components/SectionTitleSubTitle.jsx";
import { getShastarSrv } from "../../services/shastarInfo.service.js";

export const Route = createFileRoute("/shastars/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [shastars, setShastars] = useState([]);
  const getShastarsListinfo = async () => {
    const resShastars = await getShastarSrv(10);

    setShastars(resShastars.data);
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
            <SectionTitleSubTitle title="Shastar" subtitle={`24,264,526,4${shastars.length} questions`} />
            <Button>
              <Link to="/shastars/create">Create Shastar</Link>
            </Button>
          </div>
           </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  -m-2">
          {shastars.map((i) => (
            <Link to={`/shastars/s/${i._id}`}>
              <div key={i._id} className="p-4 ">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img alt="shastar" className="flex-shrink-0 rounded-lg   size-36 md:size-28 object-cover object-center sm:mb-0 mb-4" src={i.mainImage} />
                  <div className="flex-grow sm:pl-4">
                    <div className="flex justify-between items-center">
                      {" "}
                      <div className="flex flex-col">
                        {" "}
                        <h2 className="title-font font-medium text-lg text-foreground capitalize">{i.name}</h2>
                        <span className="bg-accent text-accent-foreground rounded-md  inline-flex px-2 py-1 text-xs ">{i.subType}</span>
                      </div>
                    </div>
                    <p className="mt-3 mb-1 line-clamp-2">{i.description}</p>

                    <div>
                      <span className="inline-flex gap-2 text-xs ">
                        <span className="flex gap-0.5 items-center justify-start text-muted-foreground">
                          <IconHeart size={18} />
                          {millify(i.likes || 0)}
                        </span>

                        <Link className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastars/s/${i._id}#discussion`}>
                          <IconMessageCircle2 size={18} />
                          {i.comments.length || 0}
                        </Link>

                        <span className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2">
                          <IconShare3 size={18} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
