import { IconHeart, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import millify from "millify";
import { useEffect, useState } from "react";

import { getCommentsOnSinglePostSrv } from "../services/comments.service";
import { likeShastarSrv } from "../services/shastarInfo.service";

const ShastarCard = (props) => {
  const [commentCount, setcommentCount] = useState(0);
  const getPostInfo = async () => {
    const resInfo = await getCommentsOnSinglePostSrv(props._id);
    setcommentCount(resInfo.data.length);

    // console.log("resInfo forum post card", resInfo.data);
    // console.log("commentCount forum post card", commentCount);
  };
  useEffect(() => {
    getPostInfo();
  }, []);
  return (
   
      <div className="m-1">
        {/* <div className="p-4  h-full bg-muted/10 dark:bg-muted-foreground/10 border border-border/60  rounded-lg flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"> */}
        <div className="p-2  border border-border  rounded-lg flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img alt="shastar" className="flex-shrink-0 rounded-lg size-36 md:size-28 object-cover object-center sm:mb-0 mb-4" src={props.mainImage} />
          <div className="flex-grow sm:pl-4">
            <div className="flex container w-full justify-center md:justify-between  items-center">
              <div className="flex flex-col">
             <Link key={props._id} to={`/shastars/s/${props._id}`}>
                <h2 className="hover:underline line-clamp-1 title-font font-medium text-lg text-foreground ">{props.title}</h2>
             </Link>  
                <span className="bg-accent  text-accent-foreground rounded-sm  px-2 py-1 text-xs">{props.subType}</span>
              </div>
            </div>  
            <p className="mt-3 mb-1 line-clamp-2">{props.description}</p>
            <div>
              <span className="inline-flex gap-2 text-xs">  
                <span      onClick={() => {
                                // console.log("upvotePostSrv", props._id);
                
                                likeShastarSrv(props._id);
                              }} className="cursor-pointer flex gap-0.5 items-center text-muted-foreground">
                  <IconHeart size={18} />
                  {millify(props.likes || 0)}
                </span>
                             <Link key={props._id} to={`/shastars/s/${props._id}`}>
                
                <span className="flex gap-0.5 items-center text-muted-foreground ml-2">
                  <IconMessageCircle2 size={18} />
                  {commentCount || 0}
                </span>
             </Link>    
                <span className="cursor-pointer flex gap-0.5 items-center text-muted-foreground ml-2">
                  <IconShare3 size={18} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

  );
};

export default ShastarCard;
