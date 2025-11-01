// TODO perssit teh state of likes by a user
// TODO get real time ui updates related to posts stats
import { IconArrowBigDown, IconArrowBigUp, IconEye, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import millify from "millify";
import { useEffect, useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { getCommentsOnSinglePostSrv } from "../services/comments.service.js";
import { downvotePostSrv, upvotePostSrv } from "../services/forumPost.service.js";
import { toast } from "sonner";

const ForumPostCard = (props) => {
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const [commentCount, setcommentCount] = useState(0);
  const getPostInfo = async () => {
    const resInfo = await getCommentsOnSinglePostSrv(props._id);
    setcommentCount(resInfo.data.length);

    console.log("resInfo forum post card", resInfo.data);
    // console.log("commentCount forum post card", commentCount);
  };
  useEffect(() => {
    getPostInfo();
  }, []);

  return (
    <div className="h-full my-2 flex sm:flex-row flex-col  sm:justify-start justify-center ">
      <div className="bg-muted/10 dark:bg-muted-foreground/10 border border-border/60  rounded-lg p-4 flex-grow">
        <div className="flex justify-between items-center">
          {" "}
          <div className="">
            {" "}
            <Link to={`/app/posts/p/$pId`} params={{ pId: props._id }}>
              <h2 className=" hover:underline title-font font-medium text-lg text-foreground capitalize">{props.title}</h2>
            </Link>
            <div className="text-xs flex ">
              <span className="bg-accent text-accent-foreground rounded-md px-2 py-1 text-xs">{props.category}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 mb-1 line-clamp-2">{props.content}</p>

        <div className="flex justify-between items-center  text-xs">
          <span className="flex  gap-4 items-center justify-start  ">
            <span
              onClick={async () => {
                // console.log("upvotePostSrv", props._id);
if(user){
  
              const upvoteRes= await upvotePostSrv(props._id);
              console.log(user,upvoteRes);
              
}else
{
       toast.error("You have to be logged in to like a post", { 
  action: {
    label: 'Go to Home',
    
    onClick: () => navigate({to:"/app"})
  },
})
  navigate({to:"/auth/login"})
}
              }}
              className="hover:text-primary cursor-pointer flex gap-1  text-muted-foreground">
              <IconArrowBigUp size={16} strokeWidth={1.5} />
              {millify(props.upvotes || 0)}
            </span>
            <span
              onClick={async() => {
               if(user){
  
              const downvoteRes= await downvotePostSrv(props._id);
              
              console.log(user,downvoteRes);
              
}else
{       toast.error("You have to be logged in to dislike a post", { 
  action: {
    label: 'Go to Home',
    
    onClick: () => navigate({to:"/app"})
  },
})
  navigate({to:"/auth/login"})
}}}
              className="hover:text-primary cursor-pointer flex gap-1  text-muted-foreground">
              <IconArrowBigDown size={18} />
              {millify(props.downvotes || 0)}
            </span>

            <Link hashScrollIntoView="discussion" to={`/app/posts/p/${props._id}`}>
              <span className="flex gap-1  text-muted-foreground mt-0.75 " to={`/app/shastars/s/${props._id}#discussion`}>
                <IconMessageCircle2 size={18} />
                {/* {props.comments} */}
                {commentCount}
                {/* {postStats.comments} */}
              </span>
            </Link>

            <span onClick={()=>{
              window.navigator.share(
            {    title:props.title,
              text:props.content,
                url:`https://shastarkosh.com/app/posts/p/${props._id}`
            }  )
            }} className="cursor-pointer flex gap-1  text-muted-foreground ">
              <IconShare3 size={18} />
            </span>
          </span>
          <span className=" cursor-pointer px-2 py-1 rounded-full flex gap-1  text-muted-foreground">
            <IconEye size={18} />
            {millify(props.views || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;
