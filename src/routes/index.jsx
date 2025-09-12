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
import { getCategoriesSrv } from "../services/category.service.js";
import { getForumPostSrv } from "../services/forumPost.service.js";
import { getShastarSrv } from "../services/shastarInfo.service.js";
import ShastarCard from "../components/ShastarCard.jsx";

export const Route = createFileRoute("/")({
  component: Index,
});
function Index() {
  const [shastarList, setShastarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [shastarCategories, setShastarCategories] = useState([]);
  const [resourceMaterialCategories, setResourceMaterialCategories] = useState([]);
  const [forumPostCategories, setForumPostCategories] = useState([]);

  const [forumPosts, setForumPosts] = useState([]);

  const fetchCategories = async () => {
    const categoriesResponse = await getCategoriesSrv();
    const categoriesData = categoriesResponse.data;

    const shastarFiltered = categoriesData.filter((c) => c.categoryType === "ShastarInfo");
    setShastarCategories(shastarFiltered);

    const forumFiltered = categoriesData.filter((c) => c.categoryType === "ForumPost");
    setForumPostCategories(forumFiltered);

    const resourceFiltered = categoriesData.filter((c) => c.categoryType === "ResourceMaterial");
    setResourceMaterialCategories(resourceFiltered);

    setIsLoading(false);
  };

  const fetchShastars = async () => {
    const shastarResponse = await getShastarSrv(5);
    setShastarList(shastarResponse.data);
  };

  const fetchForumPosts = async () => {
    const forumPostsResponse = await getForumPostSrv(5);
    setForumPosts(forumPostsResponse.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchShastars();
    fetchForumPosts();
  }, []);

  return (
    <main className="flex px-4 flex-col justify-start items-start">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:py-6">
          <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {/* Discussions */}
            <section className="col-span-2 border-r pr-4">
              <div className="flex justify-between items-center">
                <SectionTitleSubTitle
                  badge="Recent"
                  title="Discussions"
                  subtitle={`24,264,526,4${forumPosts.length} questions`}
                />
                <Button>
                  <Link to="/posts/create">Ask Question</Link>
                </Button>
              </div>

              {forumPosts.map((post) => (
                                  <ForumPostCard key={post._id} {...post} />
                
              ))}

              <hr />

              {/* Shastar submissions */}
              <SectionTitleSubTitle
                title="Shastar Submissions"
                badge="New"
                subtitle={faker.lorem.sentence()}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 -m-2">
                {shastarList.map((shastar) => (
                  <ShastarCard {...shastar} /> 
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="text-gray-400 body-font">
              <div className="container flex flex-col px-4 py-4 mx-auto">
                <SectionTitleSubTitle title="Categories" subtitle={faker.lorem.sentence()} />

                <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">
                  Shastar categories ({shastarCategories.length})
                </h2>
                <nav className="flex flex-wrap list-none -mb-1">
                  {shastarCategories.map((cat) => (
                    <li key={cat._id} className="lg:w-1/3 mb-1 w-1/2">
                      <Link to="#" className="lowercase hover:text-white ">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </nav>
              </div>

              <div className="container flex flex-col px-4 py-4 mx-auto">
                <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">
                  Forum categories ({forumPostCategories.length})
                </h2>
                <nav className="flex flex-wrap list-none -mb-1">
                  {forumPostCategories.map((cat) => (
                    <li key={cat._id} className="lg:w-1/3 mb-1 w-1/2">
                      <Link to="#" className="lowercase hover:text-white ">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </nav>
              </div>

              <div className="container flex flex-col px-4 py-4 mx-auto">
                <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">
                  Resource Material categories ({resourceMaterialCategories.length})
                </h2>
                <nav className="flex flex-wrap list-none -mb-1">
                  {resourceMaterialCategories.map((cat) => (
                    <li key={cat._id} className="lg:w-1/3 mb-1 w-1/2">
                      <Link to="#" className="lowercase hover:text-white ">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </nav>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
