import { Button } from "@/components/ui/button"
import Masonry from '@mui/lab/Masonry';
import { SimpleBanner } from "@/components/banner.tsx";

import { createFileRoute, Link } from '@tanstack/react-router'
import ResourceMaterialCard from "../../components/ResourceMaterialCard";
import { getResourceMaterialSrv } from "../../services/resourceMaterial.service";
import { useEffect, useState } from "react";
import SectionTitleSubTitle from "../../components/SectionTitleSubTitle";

export const Route = createFileRoute('/resources/')({
  component: RouteComponent,
})

function RouteComponent() {
    const [resources , setResources] = useState([]);
    const getShastarsListinfo = async () => {
      const resResources = await getResourceMaterialSrv(100);
  
      setResources(resResources.data);
      console.log("resResources", resources );
    };
    useEffect(() => {
      getShastarsListinfo(); 
    }, []);
  return (<>
   
  <section className="">
              
  <div className="  px-4 py-6 mx-auto">
     <SectionTitleSubTitle title="Resource Materials" subtitle={`4,984,621,4${resources.length} questions`} />
      <Button>
                   <Link to="/resources/create">Create Shastar</Link>
                 </Button>
    {/* <div className="flex flex-wrap -m-4"> */}
<Masonry columns={{sm:2,md:3,lg:4 }} spacing={1.5}>

{resources.map((post)=>{
  return (

  <div 
  key={post._id} className="my-2">
{/* {
  "_id": {
    "$oid": "68be9e785625e229b0812336"
  },
  "title": "Addo praesentium dedico stultus thema.",
  "mainImage": "https://www.gravatar.com/avatar/3882c7367f0989307eed2a7387a1534f?d=retro",
  "images": [
    "https://www.gravatar.com/avatar/a2557a7b2e94197ff767970b67041697?d=retro",
    "https://www.gravatar.com/avatar/dc912a253d1e9ba40e2c597ed2376640?d=retro",
    "https://www.gravatar.com/avatar/f4be00279ee2e0a53eafdaa94a151e2c?d=retro"
  ],
  "description": "Xiphias conscendo pecco cibo atrox varietas astrum fuga tepesco beatus. Animi bardus deporto blandior clementia speciosus ciminatio auctus aurum perferendis. Copia casus stipes ait aeneus.\nApto certe magnam eum bos quisquam. Terminatio officia video vomica amplexus uxor basium capio. Abeo vulgaris tenax.",
  "isEdited": false,
  "origin": {
    "region": "Pakistan",
    "culture": "hepatitis",
    "timePeriod": "2024 CE",
    "yearEstimated": 828
  },
  "sources": [
    {
      "title": "aranea alter temporibus",
      "author": "Mary Goldner DDS",
      "link": "https://slight-granny.info",
      "publication": "Weissnat - Considine",
      "year": 2010,
      "_id": {
        "$oid": "68be9e785625e229b0812337"
      }
    }
  ],
  "createdBy": {
    "$oid": "68be9e785625e229b0811fc9"
  },
  "categories": [
    {
      "$oid": "68be9e785625e229b0812005"
    }
  ],
  "tags": [
    "audentia",
    "atrox",
    "tandem"
  ],
  "likes": 330,
  "dislikes": 153,
  "views": 2170,
  "commentCount": 26,
  "reported": false,
  "reportReasons": [],
  "__v": 0,
  "createdAt": {
    "$date": "2025-09-08T09:14:32.596Z"
  },
  "updatedAt": {
    "$date": "2025-09-08T09:14:32.596Z"
  }
} */}
                    <ResourceMaterialCard 
                    id={post._id} 
                    title={post.title} 
                    mainImage={post.mainImage} 
                    images={post.images} 
                    description={post.description} 
                    createdBy={post.createdBy} 
                    categories={post.categories} 
                    tags={post.tags} 
                    likes={post.likes} 
                    dislikes={post.dislikes} 
                    commentCount={post.commentCount} 
                    views={post.views} 
                    
                    isPinned={post.isPinned} 
                    isEdited={post.isEdited} 
                    status={post.status} 
                    
                    createdAt={post.createdAt} 
                    updatedAt={post.updatedAt} />
                  </div>



  );
})}
   </Masonry>   
    {/* </div> */}
  </div>
</section>

 <div className=""> <SimpleBanner /></div>
</>)
}
