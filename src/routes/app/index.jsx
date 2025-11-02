import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ForumPostCard from "@/components/ForumPostCard.jsx";
import SectionTitleSubTitle from "@/components/SectionTitleSubTitle.jsx";
import ShastarCard from "@/components/ShastarCard.jsx";
import { getCategoriesSrv } from "@/services/category.service.js";
import { getForumPostSrv } from "@/services/forumPost.service.js";
import { getShastarSrv } from "@/services/shastarInfo.service.js";

export const Route = createFileRoute("/app/")({
  component: Index,
});
function Index() {
  const [shastarList, setShastarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [shastarCategories, setShastarCategories] = useState([]);
  const [resourceMaterialCategories, setResourceMaterialCategories] = useState([]);
  const [forumPostCategories, setForumPostCategories] = useState([]);

  const [forumPosts, setForumPosts] = useState([]);

  const fetchCategories = async () => {
    const categoriesResponse = await getCategoriesSrv();
 setCategories(categoriesResponse.data)
 
    const shastarFiltered = categoriesResponse.data.filter((c) => c.categoryType === "ShastarInfo");
    setShastarCategories(shastarFiltered);
    console.log(shastarFiltered); 
    

    const forumFiltered = categoriesResponse.data.filter((c) => c.categoryType === "ForumPost");
    setForumPostCategories(forumFiltered);
    console.log(forumFiltered); 
    

    const resourceFiltered = categoriesResponse.data.filter((c) => c.categoryType === "ResourceMaterial");
    setResourceMaterialCategories(resourceFiltered);
    console.log(resourceFiltered); 
    

    setIsLoading(false);
  };

  const fetchShastars = async () => {
    const shastarResponse = await getShastarSrv(5);
    setShastarList(shastarResponse.data.data);
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
        <div className="flex flex-col gap-4">
          <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-4">
            {/* Discussions */}
            <section className="col-span-3 md:border-r md:pr-4">
              <div className="flex justify-between items-center">
                <SectionTitleSubTitle
                  badge="Recent"
                  title="Discussions"
                  subtitle={`${forumPosts.length} questions`}
                />
                <Button>
                  <Link to="/app/posts/create">Ask Question</Link>
                </Button>
              </div>

              {forumPosts.map((post) => (
                                  <ForumPostCard key={post._id} {...post} />
                
              ))}
 
<br />
              {/* Shastar submissions */}
              <SectionTitleSubTitle
                title="Shastar Submissions"
                badge="New"
                subtitle={faker.lorem.sentence()}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 -m-2">
                {shastarList.map((shastar,idx

                ) => (
                  <ShastarCard key={idx} {...shastar} /> 
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className=" text-foreground body-font">
              <div className="container flex flex-col px-4 py-4 mx-auto">
                <SectionTitleSubTitle title="Categories" subtitle={faker.lorem.sentence()} />

                <h2 className="title-font font-semibold  tracking-wider text-sm mb-3">
                  Shastar categories ({shastarCategories.length}) 
                </h2>
                <nav className="flex flex-wrap  items-center list-none -mb-1">
                  {shastarCategories.map((cat) => (
                                          <li key={cat._id} className=" text-muted-foreground/80 hover:text-foreground m-1  ">
                        <Link to={`/app/categories/c/${cat._id}`} className=" lowercase border-b border-dashed border-muted-foreground/30 hover:border-b hover:border-foreground hover:border-dashed  ">
                          {cat.name}
                        </Link>
                      </li>
                  ))} 
               
                </nav>
              </div>

              <div className="container flex flex-col px-4 py-4 mx-auto">
                <h2 className="title-font font-semibold  tracking-wider text-sm mb-3">
                  Forum categories ({forumPostCategories.length})
                </h2>
                <nav className="flex flex-wrap list-none -mb-1">
                  {forumPostCategories.map((cat) => (
                                             <li key={cat._id} className=" text-muted-foreground/80 hover:text-foreground m-1  ">
                        <Link to={`/app/categories/c/${cat._id}`} className=" lowercase border-b border-dashed border-muted-foreground/30 hover:border-b hover:border-foreground hover:border-dashed  ">
                          {cat.name}
                        </Link>
                      </li>
                  ))}
                </nav>
              </div>

              <div className="container flex flex-col px-4 py-4 mx-auto">
                <h2 className="title-font font-semibold  tracking-wider text-sm mb-3">
                  Resource Material categories ({resourceMaterialCategories.length})
                </h2>
                <nav className="flex flex-wrap list-none -mb-1">
                  {categories.map((cat) => (
                                        <li key={cat._id} className=" text-muted-foreground/80 hover:text-foreground m-1  ">
                        <Link to={`/app/categories/c/${cat._id}`} className=" lowercase border-b border-dashed border-muted-foreground/30 hover:border-b hover:border-foreground hover:border-dashed  ">
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
