import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";

import DiscussionSection from "@/components/DiscussionSection.jsx";
import { getSingleForumPostSrv } from "@/services/forumPost.service.js";
import Loading from "@/components/Loading.jsx";

dayjs.extend(relativeTime);

export const Route = createFileRoute("/app/posts/p/$pId")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);

  const { pId } = Route.useParams();
  const { handleSubmit, reset, watch, register, formState } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [postDetail, setPostDetail] = useState({});
  const [tags, settags] = useState([]);
  const [postCreator, setPostCreator] = useState({});
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState([]);

  const getPostInfo = async () => {
    const resInfo = await getSingleForumPostSrv(pId);
    setPostDetail(resInfo.data.post);
    setComments(resInfo.data.comments);
    settags(resInfo.data.tags);
    console.log("resInfo.data.tags", resInfo.data.tags);
    setPostCreator(resInfo.data.author);
    setLoading(false);
    // setPostDetail(resInfo.data.post);
    // setAuthor(resInfo.data.author);

    // console.log("resPost creator", postCreator);
    // console.log("resPost comments", comments);
  };

  useEffect(() => {
    getPostInfo();
    console.log("resPost tags", tags);

    console.log("resPost detail useeffect", postDetail);
    console.log("resPost creator useeffect", postCreator);
    console.log("resPost comments useeffect", comments);
  }, []);
  const onSubmit = async (data) => {
    console.log(
      postDetail._id,
      {
        text: commentValue,
        discussionType: "ForumPost",
        discussionId: pId,
        author: {
          id: user._id,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        },
      },
      data
    );

    // await getSingleForumPostSrv(pId);
    getPostInfo()
    // reset();
  };
  useEffect(() => {
    console.log("tags updated", tags);
  }, [tags]);
  return (
    <>
      <main className="px-8 pb-12 flex flex-col items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/posts/">Posts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{postDetail?.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {loading ? (
           <Loading/> 
        ) : (
          <section className="w-full   container text-muted-foreground body-font overflow-hidden">
            <section className="body-font overflow-hidden">
              <div className=" container   py-6 mx-auto">
                <div className="   -m-12">
                  <div className="p-12 flex flex-col items-start">
                    <h2 className="sm:text-3xl text-2xl title-font font-medium text-foreground mt-4 mb-4">{postDetail.title}</h2>
                    {/* <p className="leading-relaxed mb-4">{postDetail.content}</p> */}
                    <Markdown>{postDetail.content}</Markdown>

                    <Badge variant="secondary" className="my-4 mb-2 inline-block font-medium  capitalize">
                      {postDetail.category}
                    </Badge>
                    <div className="flex gap-4">{tags && tags.length > 0 && tags.map((tag, idx) => <span key={idx} className="font-bold text-sm">{tag} </span>)}</div>

                    <div className="flex items-center flex-wrap py-4 border-b-2 border-gray-800 border-opacity-75 mt-auto w-full">
                      <div className="inline-flex items-center">
                        <img alt="post-avatar" src={postCreator.avatar} className="size-6 rounded-full flex-shrink-0 object-cover object-center" />
                        <span className="flex-grow flex flex-col pl-2">
                          <span className="title-font font-medium text-foreground text-sm">{postCreator.name}</span>
                          <span className="text-muted-foreground/60 text-xs ">Posted {postDetail?.createdAt ? dayjs(postDetail.createdAt).fromNow() : ""}</span>
                        </span>
                      </div>
                      {/* <span className="text-muted-foreground/60 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1   ">
                      <IconEye />
                      {millify(postDetail.views)}
                    </span> */}
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
            <DiscussionSection type="ForumPost" discussionPlaceId={pId} />
          </section>
        )}
      </main>
    </>
  );
}
