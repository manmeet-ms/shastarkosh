import { IconArrowRight, IconHeart, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getShastarSrv } from "../services/shastarInfo.service.js";
import millify from "millify";

const Shastars = () => {
  const [shastars, setShastars] = useState([]);
  const getShastarsListinfo = async () => {
    const resShastars = await getShastarSrv(100);

    setShastars(resShastars.data);
    console.log("resShastars", shastars);
  };
  useEffect(() => {
    getShastarsListinfo();
  }, []);

  return (
    <>
      <section className="text-muted-foreground/60 body-font">
        <div className="container px-4  mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">OUR TEAM</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{shastars.length} Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  -m-2">
            {shastars.map((i) => (
              <Link to={`/shastar/${i._id}`}>
                <div key={i._id} className="p-4 ">
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img alt="shastar" className="flex-shrink-0 rounded-lg w-36 h-36 object-cover object-center sm:mb-0 mb-4" src={i.mainImage} />
                    <div className="flex-grow sm:pl-8">
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
                          <a className="flex gap-0.5 items-center justify-start text-muted-foreground">
                            <IconHeart size={18} />{millify(i.likes || 0)}
                          </a>

                          <Link className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastar/${i._id}#discussion`}>
                          <IconMessageCircle2 size={18} />{i.comments.length|| 0}
                        </Link>

                          <a className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2">
                            <IconShare3 size={18} /> 
                          </a>
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
    </>
  );
};

export default Shastars;
