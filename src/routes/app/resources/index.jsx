import { SimpleBanner } from "@/components/banner.tsx";
import { Button } from "@/components/ui/button";
import Masonry from "@mui/lab/Masonry";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ResourceMaterialCard from "@/components/ResourceMaterialCard";
import SectionTitleSubTitle from "@/components/SectionTitleSubTitle";
import { getResourceMaterialSrv } from "@/services/resourceMaterial.service";

export const Route = createFileRoute("/app/resources/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [resources, setResources] = useState([]);
  const getShastarsListinfo = async () => {
    const resResources = await getResourceMaterialSrv(100);

    setResources(resResources.data.data);
    console.log("resResources", resources);
  };
  useEffect(() => {
    getShastarsListinfo();
  }, []);
  return (
    <>
      <section className="">
        <div className="  px-4 py-6 mx-auto">
          <div className="flex justify-between items-center">
            <SectionTitleSubTitle title="Resource Materials" subtitle={`${resources.length} materials`} />
            <Button>
              <Link to="/app/resources/create">Create Resource</Link>
            </Button>
          </div>
          {/* <div className="flex flex-wrap -m-4"> */}
          <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={1}>
            {resources.map((post) => {
              return (
               
                  <ResourceMaterialCard key={post._id} id={post._id} title={post.title} mainImage={post.mainImage} images={post.images} description={post.description} createdBy={post.createdBy} categories={post.category} tags={post.tags} likes={post.likes} dislikes={post.dislikes} commentCount={post.commentCount} views={post.views} isPinned={post.isPinned} isEdited={post.isEdited} status={post.status} createdAt={post.createdAt} updatedAt={post.updatedAt} />
                 
              );
            })}
          </Masonry>
          {/* </div> */}
        </div>
      </section>

      <div className="">
        {" "}
        <SimpleBanner />
      </div>
    </>
  );
}
