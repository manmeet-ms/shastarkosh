import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconArrowBigDown, IconArrowBigUp, IconArrowDown, IconArrowDownBar, IconArrowUp, IconEye, IconHeart, IconMessageCircle2, IconShare3 } from "@tabler/icons-react";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { getForumPostSrv } from "../services/forumPost.service.js";
import { getShastarSrv } from "../services/shastarInfo.service.js";
import { faker } from "@faker-js/faker";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      // Clean up URL so token isn't exposed in address bar
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [location]);
  const [shastars, setShastars] = useState([]);
  const getShastarsList = async () => {
    const resShastars = await getShastarSrv(5);

    setShastars(resShastars.data);
    console.log("resShastars", shastars);
  };
  useEffect(() => {
    getShastarsList();
  }, []);
  const [forumPosts, setForumPosts] = useState([]);
  const getForumPostsList = async () => {
    const resPosts = await getForumPostSrv(5);

    setForumPosts(resPosts.data);
    console.log("resPosts", forumPosts);
  };
  useEffect(() => {
    getForumPostsList(5);
  }, []);
  return (
    <>
      <main className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:py-6">
            header
            <section className="grid grid-cols-1 items-start gap-4  md:grid-cols-3 lg:changed-px px-4">
              <section className="col-span-2">
                {/* {
    "_id": "68b93e48f2ef779c84fed92e",
    "title": "Conqueror ipsa tibi ventus.",
    "content": "Conor beatae capitulus vester acquiro repellendus pecus arx suasoria cibo. Solitudo aggero capto degero adhaero. Sublime tergeo odit.\nDemulceo amplexus amaritudo conventus bis decipio absconditus defero carbo. Video bardus aptus undique sum audentia peior sortitus defessus. Adaugeo valeo copia doloribus aveho.",
    "author": "bbbd0c026d2c750caecd9dff",
    "category": "3ead000fbd7b6187b707da63",
    "tags": [
        "self-assured"
    ],
    "upvotes": 542,
    "downvotes": 538,
    "views": 5534266742072443,
    "isPinned": true,
    "status": "deleted",
    "__v": 0,
    "createdAt": "2025-09-04T07:22:48.375Z",
    "updatedAt": "2025-09-04T07:22:48.375Z"
} */}
                {forumPosts.map((post) => (
                 
                    <div key={post._id} className="my-2 ">
                      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                        <div className="bg-accent/20 border border-border/40 rounded-lg p-4  flex-grow  ">
                          <div className="flex justify-between items-center">
                            {" "}
                            <div className="">
                              {" "}

                               <Link  to={`/post/${post._id}`}>
                              <h2 className=" hover:underline  title-font font-medium text-lg text-foreground capitalize">{post.title}</h2>
                               </Link>
                              <div className="text-xs flex gap-2" ><span className="bg-accent text-accent-foreground rounded-md    px-2 py-1 text-xs ">{post.tags}</span>
                               <a className="flex gap-0.5 items-center justify-start text-muted-foreground">
                                <IconEye size={18} />
                                {millify(post.views || 0)}
                              </a></div>
                            </div>
                          </div>
                          <p className="mt-3 mb-1 line-clamp-2">{post.content}</p>

                          <div>
                            <span className="inline-flex gap-2 text-xs ">
                              <a className="flex gap-0.5 items-center justify-start text-muted-foreground">
                                <IconArrowBigUp size={18} />
                                {millify(post.upvotes || 0)}
                              </a>
                              <a className="flex gap-0.5 items-center justify-start text-muted-foreground">
                                <IconArrowBigDown size={18} />
                                {millify(post.downvotes || 0)}
                              </a>
                             

                              <Link className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastar/${post._id}#discussion`}>
                                <IconMessageCircle2 size={18} />
                                {/* {post.comments.length || 0} */}
                              </Link>

                              <a className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2">
                                <IconShare3 size={18} />
                              </a>
                              {post.status}
                            </span>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  
                ))}

                <hr />

                <div className="grid grid-cols-1 md:grid-cols-2  -m-2">
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
                                  <IconHeart size={18} />
                                  {millify(i.likes || 0)}
                                </a>

                                <Link className="flex gap-0.5 items-center justify-start text-muted-foreground ml-2" to={`/shastar/${i._id}#discussion`}>
                                  <IconMessageCircle2 size={18} />
                                  {i.comments.length || 0}
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
              </section>

              <section>
                <section className="border-l text-gray-400 body-font  ">
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
                    <div className="flex flex-col    ">
                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Shastar categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        
                        
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
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
                    <div className="flex flex-col    ">
                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Posts categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        
                        
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
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
                    <div className="flex flex-col    ">
                      <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">Resource Material categories</h2>
                      <nav className="flex flex-wrap list-none -mb-1">
                        
                        
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                          <a className="hover:text-white capitalize ">{faker.lorem.word()}</a>
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
};

export default Home;
