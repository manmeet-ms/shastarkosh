// TODO perssit teh state of likes by a user
// TODO get real time ui updates related to posts stats
import { Button } from "@/components/ui/button"

import { IconArrowBigDown, IconArrowBigUp, IconEye, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import millify from "millify";

import { getCommentsOnSinglePostSrv } from "../services/comments.service";
import { useEffect, useState } from "react";
import { upvotePostSrv, downvotePostSrv } from "../services/forumPost.service";

const ForumPostCard = (props) => {
  const [commentCount, setCommentCount] = useState(0)

  const [postStats, setPostStats] = useState({
    upvotes: 0,
    downvotes: 0,
    comments: 0,
  });

  const getCommmentsCont = async () => {
    const count = await getCommentsOnSinglePostSrv(props.id);
    console.log(count);
    
    setCommentCount(count.data)
    setPostStats(prev=>({...prev,comments:count.data}))
    
  };
  useEffect(() => {
    getCommmentsCont()
  
    
  }, [])
  
  return (
    <div className="h-full flex sm:flex-row flex-col  sm:justify-start justify-center ">
      <div className="bg-accent/20 border border-border/40 rounded-lg p-4 flex-grow">
        <div className="flex justify-between items-center">
          {" "}
          <div className="">
            {" "}
            <Link to={`/posts/p/$pid`} params={{ pid: props.id }}>
              <h2 className=" hover:underline title-font font-medium text-lg text-foreground capitalize">{props.title}</h2>
            </Link>
            <div className="text-xs flex ">
              <span className="bg-accent text-accent-foreground rounded-md px-2 py-1 text-xs">{props.category}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 mb-1 line-clamp-2">{props.content}</p>

        <div className="flex justify-between items-center text-xs">
          <span className="inline-flex relative right-2 ">
            <span onClick={()=>{
              console.log("upvotePostSrv",props.id);
              
              upvotePostSrv(props.id)}} className="hover:text-primary cursor-pointer hover:bg-accent/80 px-2 py-1 rounded-full flex gap-0.5 items-center justify-start text-muted-foreground">
               <IconArrowBigUp size={16} strokeWidth={1.5} />
              {millify(props.upvotes || 0)}
            </span>
            <span onClick={()=>{
              console.log("downvotePostSrv",props.id);
              
              downvotePostSrv(props.id)}} className="hover:text-primary cursor-pointer hover:bg-accent/80 px-2 py-1 rounded-full flex gap-0.5 items-center justify-start text-muted-foreground">
              <IconArrowBigDown size={16} strokeWidth={1.5} />
              {millify(props.downvotes || 0)}
            </span>

         <Link hashScrollIntoView="discussion" to={`/posts/p/${props.id}`}>   <span className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastars/s/${props._id}#discussion`}>
              <IconMessageCircle2 size={18} />
              {commentCount}
              {/* {postStats.comments} */}
            </span></Link>

            <span className="cursor-pointer flex gap-0.5 items-center justify-start text-muted-foreground ml-2">
              <IconShare3 size={18} />
            </span>
          </span>
          <span className=" cursor-pointer px-2 py-1 rounded-full flex gap-0.5 items-center justify-start text-muted-foreground">
            <IconEye size={18} strokeWidth={1.5} />
            {millify(props.views || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;
