import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { IconDots, IconEye, IconMinusVertical } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import millify from "millify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";

import { getCommentsOnSinglePostSrv, postCommentSrv } from "../services/comments.service";
import SectionTitleSubTitle from "./SectionTitleSubTitle";

const DiscussionSection = (props) => {
  // console.log({ ...props });
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState([]);
  const { handleSubmit, reset, watch, register, formState } = useForm();
  const { user } = useSelector((state) => state.auth);
  // console.log("commenter:", user);

  const onSubmit = async (data) => {
    console.log(
      props.discussionPlaceId,
      {
        text: commentValue,
        author: {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        },
      },
      data
    );

    await postCommentSrv(props.discussionPlaceId, {
      content: commentValue,
      discussionId: props.discussionPlaceId,
      discussionType: props.type,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
    });
    //   TODO update the comen count to the latest with controlelrs
  };
  async function fetchComments() {
    const discussionComments = await getCommentsOnSinglePostSrv(props.discussionPlaceId);
    setComments(discussionComments.data);
    // console.log("discussionComments", discussionComments.data);
  }
  useEffect(() => {
    fetchComments();
  }, [props.discussionPlaceId]);
  return (
    <section id="discussion" className="    antialiased">
      <SectionTitleSubTitle title={`Discussion (${comments.length})`} />
      <div className="container w-full  max-w-[80vw]  ">
        {/* <div className="max-w-2xl  "> */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="flex flex-col items-start gap-4 ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>

            <Textarea name="comment" {...register("commentValue")} rows="6" columns="3" placeholder="Write a comment..." value={commentValue} onChange={(e) => setCommentValue(e.target.value)} required />
            <Button onClick={handleSubmit}>Post comment</Button>
          </div>
        </form>

        {comments.map((c) => {
          // console.log("comments.map", c);

          return (
            <article key={c._id} className="py-3 text-base border-border border-b  rounded-lg ">
              <footer className="flex justify-between items-center mb-2 ">
                <div className="flex items-center  ">
                  <div className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src={c.author.avatar} alt={c.author.name} />
                    <div className="flex flex-col">
                      <p className="inline-flex items-center   text-sm text-foreground font-semibold">{c.author.name}</p>
                      <span className="text-xs text-muted-foreground/60  ">@{c.author.username}</span>
                    </div>
                  </div>
                  {/* <IconMinusVertical className=" opac" strokeWidth={1}/> */}
                </div>
                {/* <DropdownMenu>
                        <DropdownMenuTrigger><IconDots size={18}/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                         
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu> */}
                {/*
                  TODO Reporting mechanism 
                  TODO nested comments 
                 */}
              </footer>
              <p className="text-gray-500 pl-1 overflow-scroll dark:text-gray-400">{c.content}</p>
              {/* <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div> */}
              <p className="text-xs  text-muted-foreground/60 ">
                {/* {dayjs(c.createdAt).format("MMM DD, YYYY")}
                          <br /> */}
                {dayjs(c.createdAt).fromNow()}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DiscussionSection;
