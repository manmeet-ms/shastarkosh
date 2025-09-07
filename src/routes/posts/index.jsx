import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ForumPostCard from "../../components/ForumPostCard";
import SectionTitleSubTitle from "../../components/SectionTitleSubTitle";
import { getForumPostSrv } from "../../services/forumPost.service";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [forumPosts, setForumPosts] = useState([]);
  const getForumPostsList = async () => {
    const resPosts = await getForumPostSrv(100);

    setForumPosts(resPosts.data);
    console.log("resPosts", forumPosts);
  };
  useEffect(() => {
    getForumPostsList(100);
  }, []);
  return (
    <main className="flex px-4  flex-col justify-start items-start ">
      <div className=" flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:py-6">
          <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            <section className="col-span-2">
              <div className="flex justify-between items-center">
                <SectionTitleSubTitle title="Latest Discussions" subtitle={`24,264,526,${forumPosts.length} questions`} />
                <Button>
                  <Link to="/posts/create">Ask Question</Link>
                </Button>
              </div>

              {forumPosts.map((post) => (
                <div key={post._id} className="my-2">
                  {/* {
  "title": "Carcer depulso inflammatio maiores cauda caute demo sortitus.",
  "content": "Acies demulceo odit. Quis cogito tres capillus turba. Careo ancilla aro modi.\nSocius trepide perferendis suppono adduco officiis ago vox. Curia tergiversatio vulgus uterque verbum utroque thorax. Vulpes ait pauper defetiscor utrimque deorsum.\nValetudo talio tergum eum fugiat. Voluptas deporto ademptio calcar amiculum turba. Curia agnitio commemoro conatus bestia damnatio cupressus quia acervus dens.\nAstrum inventore tunc deporto tres vigor civis celer vobis derelinquo. Bonus solum baiulus allatus voluptatem acies audentia cognatus impedit cursus. Suppellex stabilis saepe vere.\nVolup tabella audentia tollo vomer. Thymum vetus debitis. Canis mollitia nisi super arguo texo unde corporis.",
  "author": {
    "$oid": "68bbab9c01d316afe584b481"
  },
  "category": {
    "$oid": "68bbae97eafdb26bcbb77e2b"
  },
  "tags": [
    "unusual"
  ],
  "upvotes": 61,
  "downvotes": 385,
  "views": 3837,
  "isPinned": true,
  "status": "deleted",
  "comments": [],
  "createdAt": {
    "$date": "2025-09-06T04:26:13.213Z"
  },
  "updatedAt": {
    "$date": "2025-09-06T04:26:13.213Z"
  },
  "__v": 0
} */}
                  <ForumPostCard id={post._id} title={post.title} content={post.content} author={post.author} category={post.category} tags={post.tags} upvotes={post.upvotes} downvotes={post.downvotes} views={post.views} isPinned={post.isPinned} status={post.status} comments={post.comments} createdAt={post.createdAt} updatedAt={post.updatedAt} />
                </div>
              ))}

              <hr />

              <SectionTitleSubTitle title="Discussions" subtitle={faker.lorem.sentence()} />
              <div className="grid grid-cols-1 md:grid-cols-2 -m-2"></div>
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
  );
}
// TODO make it discussions
