import { IconEye, IconFileDislike, IconFileLike, IconHeart, IconMessageCircle, IconShare, IconShare2, IconShare3, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import millify from "millify";
import React from "react";

const ResourceMaterialCard = (props) => {

  return (
     <Link to={`/resources/r/${props.id}`}>
      <div className="bg-card h-full border-2  rounded-lg overflow-hidden">
        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.mainImage} alt="blog" />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{String(props.categories)}</h2>
          <h1 className="title-font text-lg font-medium text-foreground line-clamp-1 mb-3">{props.title}</h1>
          <p className="leading-relaxed line-clamp-3 mb-3">{props.description}</p>
          <div className="flex items-center flex-wrap ">
            {/* <Link to={`/resources/${props.id}`} className="text-purple-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path d="M5 12h14"></path>
     <path d="M12 5l7 7-7 7"></path>
    </svg>
    </Link> */}
            <div className="flex relative right-1 justify-between items-center ">
              <div className="flex items-center ">
                {" "}
                <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center gap-0.5 justify-start text-sm ">
                  <IconHeart size={18} /> {millify(props.likes)}
                </span>
                {/* <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center gap-0.5 justify-start text-sm ">
                  <IconThumbDown size={18} /> {millify(props.likes)}
                </span> */}
                <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center text gap-0.5 justify-start text-sm ">
                  <IconMessageCircle size={18} /> {millify(props.likes)}
                </span>
              </div>

              {/* <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items gap-0.5 justify-start text-sm ">
                <IconEye size={18} /> {millify(props.likes)}
              </span> */}
            </div>
          </div>
        </div>
      </div></Link>

  );
};

export default ResourceMaterialCard;
