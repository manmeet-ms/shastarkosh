import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import { IconHeart, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import { Link, createFileRoute, useLocation } from "@tanstack/react-router";
import axios from "axios";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ForumPostCard from "../components/ForumPostCard.jsx";
import SectionTitleSubTitle from "../components/SectionTitleSubTitle.jsx";
import api from "../services/api.js";
import { getForumPostSrv } from "../services/forumPost.service.js";
import { getShastarSrv } from "../services/shastarInfo.service.js";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // const location = useLocation();
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const token = params.get("token");

  //   if (token) {
  //     localStorage.setItem("authToken", token);
  //     // Clean up URL so token isn't exposed in address bar
  //     window.history.replaceState({}, document.title, "/dashboard");
  //   }
  // }, [location]);
  const [shastars, setShastars] = useState([]);
  const [loading, setloading] = useState(true);
  const [shastarcatg, setshastarcatg] = useState([]);
  const [resourcematerialcatg, setresourcematerialcatg] = useState([]);
  const [forumpostcatg, setforumpostcatg] = useState([]);
  const getcatg = async () => {
    const ShastarInfoCat = await api.get("/category/t?type=ShastarInfo");
    setshastarcatg(ShastarInfoCat.data);

    const ResourceMaterialCat = await api.get("/category/t?type=ResourceMaterial");
    setresourcematerialcatg(ResourceMaterialCat.data);

    const ForumPostsCat = await api.get("/category/t?type=ForumPosts");
    setforumpostcatg(ForumPostsCat.data);


setloading(false)
 console.log("shastarcatg", shastarcatg);
    
    console.log("resourcematerialcatg", resourcematerialcatg);
    
    console.log("forumpostcatg", forumpostcatg);
  
  };

  const getShastarsList = async () => {
    const resShastars = await getShastarSrv(5);

    setShastars(resShastars.data);
    // console.log("resShastars", shastars);
  };
  useEffect(() => {
    getcatg();
    getShastarsList();
  }, []);
  const [forumPosts, setForumPosts] = useState([]);
  const getForumPostsList = async () => {
    const resPosts = await getForumPostSrv(5);
 
    setForumPosts(resPosts.data);
    // console.log("resPosts", forumPosts);
  };
  useEffect(() => {
    getForumPostsList(5);
  }, []);
  return (
    <>
      <main className="flex px-4  flex-col justify-start items-start ">
        <div className=" flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
            <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
              <section className="col-span-2">
                <div className="flex justify-between items-center">
                  <SectionTitleSubTitle badge="Recent" title="Discussions" subtitle={`24,264,526,4${forumPosts.length} questions`} />
                  <Button>
                    <Link to="/posts/create">Ask Question</Link>
                  </Button>
                </div>

                {forumPosts.map((post) => (
                  <div key={post._id} className="my-2">
                    <ForumPostCard id={post._id} title={post.title} content={post.content} author={post.author} category={post.category} tags={post.tags} upvotes={post.upvotes} downvotes={post.downvotes} views={post.views} isPinned={post.isPinned} status={post.status} comments={post.commentCount} createdAt={post.createdAt} updatedAt={post.updatedAt} />
                  </div>
                ))}

                <hr />

                <SectionTitleSubTitle title="Shastar Submissions" badge="New" subtitle={faker.lorem.sentence()} />
                <div className="grid grid-cols-1 md:grid-cols-2 -m-2">
                  {shastars.map((i) => (
                    <Link key={i._id} to={`/shastars/s/${i._id}`}>
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
                                <span className="cursor-pointer flex gap-0.5 items-center justify-start text-muted-foreground">
                                  <IconHeart size={18} />
                                  {millify(i.likes || 0)}
                                </span>

                                <span className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastar/${i._id}#discussion`}>
                                  <IconMessageCircle2 size={18} />
                                  {i.comments || 0}
                                </span>

                                <span className="cursor-pointer flex gap-0.5 items-center justify-start text-muted-foreground ml-2">
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
              </section>

              <section>
                <section className="border-l text-gray-400 body-font">
                  <div className="container flex flex-wrap px-4 py-4 mx-auto items-center">
                    {/* <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 md:mb-0 mb-10 pb-10 border-b border-gray-800">
  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Explore categories</h1>
  <p className="leading-relaxed text-base">Locavore cardigan small batch roof party blue bottle blog meggings sartorial jean shorts kickstarter migas sriracha church-key synth succulents. Actually taiyaki neutra, distillery gastropub pok pok ugh.</p>
  <a className="text-indigo-400 inline-flex items-center mt-4">Learn More
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
   <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
  </a>
 </div> */}
                    <div className="flex flex-col">
                      <SectionTitleSubTitle title="Categories" subtitle={faker.lorem.sentence()} />

                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Shastar categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                      </nav>
                    </div>
                  </div>
                  <div className="container flex flex-wrap px-4 py-4 mx-auto items-center">
                    {/* <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 md:mb-0 mb-10 pb-10 border-b border-gray-800">
  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Explore categories</h1>
  <p className="leading-relaxed text-base">Locavore cardigan small batch roof party blue bottle blog meggings sartorial jean shorts kickstarter migas sriracha church-key synth succulents. Actually taiyaki neutra, distillery gastropub pok pok ugh.</p>
  <a className="text-indigo-400 inline-flex items-center mt-4">Learn More
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
   <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
  </a>
 </div> */}
                    <div className="flex flex-col">
                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Posts categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                      </nav>
                    </div>
                  </div>
                  <div className="container flex flex-wrap px-4 py-4 mx-auto items-center">
                    {/* <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 md:mb-0 mb-10 pb-10 border-b border-gray-800">
  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Explore categories</h1>
  <p className="leading-relaxed text-base">Locavore cardigan small batch roof party blue bottle blog meggings sartorial jean shorts kickstarter migas sriracha church-key synth succulents. Actually taiyaki neutra, distillery gastropub pok pok ugh.</p>
  <a className="text-indigo-400 inline-flex items-center mt-4">Learn More
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
   <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
  </a>
 </div> */}
                    <div className="flex flex-col">
                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Resource Material categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <Link to="#" className="hover:text-white capitalize">
                            {faker.lorem.word()}
                          </Link>
                        </li>
                      </nav>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
