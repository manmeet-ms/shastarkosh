import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { IconDots, IconEye, IconMinusVertical } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import millify from "millify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";

import DiscussionSection from "../../components/DiscussionSection";
import SectionTitleSubTitle from "../../components/SectionTitleSubTitle";
import { postCommentSrv } from "../../services/comments.service";
import { downvotePostSrv, getSingleForumPostSrv, updateForumPostSrv } from "../../services/forumPost.service";

// ES 2015

dayjs.extend(relativeTime);

export const Route = createFileRoute("/posts/p/$pId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pId } = Route.useParams();
  const { handleSubmit, reset, watch, register, formState } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState([]);
  // const [author, setAuthor] = useState({});
  const getPostInfo = async () => {
    const resInfo = await getSingleForumPostSrv(pId);
    console.log(resInfo.data);

    setPostDetail(resInfo.data.post);
    setComments(resInfo.data.comments);
    // setPostDetail(resInfo.data.post);
    // setAuthor(resInfo.data.author);

    console.log("resPost detail", postDetail);
    console.log("resPost comments", comments);
  };

  useEffect(() => {
    getPostInfo();

    console.log("resPost detail useEffect", postDetail);
  }, []);
  const onSubmit = async (data) => {
    console.log(
      postDetail._id,
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

    await postCommentSrv(postDetail._id, {
      comment: commentValue,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
    });
    reset();
    await getSingleForumPostSrv(pId);
  };
  return (
    <>
      <main className="px-4 pb-24 flex flex-col items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts/">Posts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{postDetail?.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="w-full   container text-muted-foreground body-font overflow-hidden">
          <section className="body-font overflow-hidden">
            <div className=" container px-4 py-12 mx-auto">
              <div className="   -m-12">
                <div className="p-12 flex flex-col items-start">
                  <span className="inline-block py-1 px-2 rounded bg-accent text-muted-foreground text-opacity-75 text-xs font-medium tracking-widest">{postDetail.category}</span>
                  <h2 className="sm:text-3xl text-2xl title-font font-medium text-foreground mt-4 mb-4">{postDetail.title}</h2>
                  {/* <p className="leading-relaxed mb-4">{postDetail.content}</p> */}
                  <Markdown>{postDetail.content}</Markdown>
                  <div className="flex items-center flex-wrap py-4 border-b-2 border-gray-800 border-opacity-75 mt-auto w-full">
                    <div className="inline-flex items-center">
                      <img alt="post-avatar" src={postDetail?.author?.avatar} className="size-6 rounded-full flex-shrink-0 object-cover object-center" />
                      <span className="flex-grow flex flex-col pl-2">
                        <span className="title-font font-medium text-foreground text-sm">{postDetail?.author?.name}</span>
                        <span className="text-muted-foreground/60 text-xs ">Posted {postDetail?.createdAt ? dayjs(postDetail.createdAt).fromNow() : ""}</span>
                      </span>
                    </div>
                    <span className="text-muted-foreground/60 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1   ">
                      <IconEye />
                      {millify(postDetail.views)}
                    </span>
                    {/* <span className="text-muted-foreground/60 inline-flex items-center leading-none text-sm">
    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
    {millify(postDetail?.comments?.length) 
    
    ||0}
    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <DiscussionSection discussionPlaceId={pId} />
          
        </section>
      </main>
    </>
  );
}
