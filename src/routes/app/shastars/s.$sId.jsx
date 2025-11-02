import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconShare2 } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import DiscussionSection from "@/components/DiscussionSection";
import { getSingleShastarSrv } from "@/services/shastarInfo.service";
import { getUserSrv } from "@/services/user.service";

export const Route = createFileRoute("/app/shastars/s/$sId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sId } = Route.useParams();

  const [shastar, setShastar] = useState({});
  const [currentImageFocusURL, setcurrentImageFocusURL] = useState("/assets/placeholder-image.png");

  const getShastarInfo = async () => {
    const response = await getSingleShastarSrv(sId);
    console.log("Shastar Response:", response.data);

    setShastar(response.data);
    setcurrentImageFocusURL(response.data.mainImage);

    // Fetch creator info after setting shastar
    if (response.data.createdBy) {
      const creator = await getUserSrv(response.data.createdBy);
      setcreatorInfo(creator.data);
      console.log("Creator:", creator.data);
    }
  };

  const [creatorInfo, setcreatorInfo] = useState();
  // async function getCreatorInfo(creatorId) {
  //   const creator = await getUserSrv(shastar.createdBy);
  //   setcreatorInfo(creator.data)
  //   // console.log(creatorId, creator);
  //   // return creator;
  // }
  useEffect(() => {
    getShastarInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO gets shatsra details make a empty objects and store it , cache it,
  // fetch shartas info and cche it and displa
  return (
    <>
      <main className="px-4 pb-24 flex flex-col items-start">
        {" "}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/shastars">Shastars</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{shastar?.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="text-gray-400   body-font overflow-hidden">
          <div className="container px-4 pt-12 mx-auto">
            <div className="flex flex-wrap  ">
              <div className="p-6 md:w-1/2 flex flex-col items-center">
                <img className="rounded-lg  w-full h-96 object-center object-cover" src={currentImageFocusURL || shastar?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                <div className="flex gap-2 py-2 justify-center items-center container w-full ">
                  {/* TODO main image gets lost when any of the image is clicked */}
                  {/* {shastar?.images.map((i)=>(

                  <img className="rounded-lg  size-16 object-center object-cover" src={shastar?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                  ))} */}
                  <img onClick={() => setcurrentImageFocusURL(shastar?.mainImage)} className="rounded-lg size-16 object-center object-cover cursor-pointer" src={shastar?.mainImage || "/assets/placeholder-weapon.png"} alt="main" />
                  {Array.isArray(shastar.images) && shastar.images.length > 0 ? shastar.images.map((img, idx) => (
                    <img 
                      onClick={() => setcurrentImageFocusURL(typeof img === 'string' ? img : img.url)} 
                      key={idx} 
                      className="rounded-lg size-16 object-center object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                      src={typeof img === 'string' ? img : img.url || "/assets/placeholder-weapon.png"} 
                      alt={`thumb-${idx}`} 
                    />
                  )) : null}
                  
                </div>
              </div>
              <div className="p-6 md:w-1/2 flex flex-col items-start">
                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium  uppercase">{shastar.category}</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{shastar?.title}</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" ">Paramters</TableHead>
                      <TableHead className=" ">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Length</TableCell>
                      <TableCell>{shastar.length}m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Weight</TableCell>
                      <TableCell>{Number(shastar.weight).toFixed(0)}g</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {Array.isArray(shastar.alternativeNames) && shastar.alternativeNames.length > 0 && (
                  <div className="my-3 font-medium flex flex-wrap gap-2">
                    <span>Alternative names:</span>
                    {shastar.alternativeNames.map((name, idx) => (
                      <span key={idx} className="font-normal text-muted-foreground">
                        {name}{idx < shastar.alternativeNames.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
                <p className="leading-relaxed mb-8">{shastar.usage}</p>
                {/* <div className="flex items-center flex-wrap pb-4   border-gray-800 border-opacity-75 mt-auto w-full">
                  <a className="inline-flex items-center">
                    <img alt="creator" src={creatorInfo?.avatar} className="w-6 h-6 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-white">{creatorInfo?.name}</span>
                      <span className="text-muted-foreground text-xs  mt-0.5">                      <span className="title-font font-medium text-white">{creatorInfo?.username}</span>
</span> 
                    </span>
                  </a> 
     <div className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src={creatorInfo?.avatar} alt={creatorInfo?.name} />
                    <div className="flex flex-col">
                      <p className="inline-flex items-center   text-sm text-foreground font-semibold">{creatorInfo?.name}</p>
                      <span className="text-xs text-muted-foreground/60  ">@{creatorInfo?.username}</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {millify(shastar?.views)}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                    {"20"}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
          <Tabs className="mx-4" defaultValue="information">
            <TabsList>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="information">
              <section className="py-6">
                <div className="grid gap-8 md:grid-cols-12">
                  <div className="md:col-span-8">
                    <div className="prose prose-invert max-w-none mb-8">
                      <Markdown>{shastar?.description}</Markdown>
                    </div>
                    
                    <div className="border-t border-border pt-6 mt-8">
                      <h3 className="text-lg font-semibold mb-4">About this Shastar</h3>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <img className="w-12 h-12 rounded-full" src={creatorInfo?.avatar} alt={creatorInfo?.name} />
                        <div className="flex flex-col">
                          <p className="text-sm text-foreground font-semibold">{creatorInfo?.name}</p>
                          <span className="text-xs text-muted-foreground">@{creatorInfo?.username}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Created {dayjs(shastar.createdAt).fromNow()} • Last updated {dayjs(shastar.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-4">
                    <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm sticky top-4">
                      <div className="border-border bg-muted/50 border-b px-5 py-4">
                        <h3 className="flex items-center text-sm font-semibold">
                          <IconShare2 className="text-muted-foreground mr-2.5 size-3.5" />
                          Share Shastar
                        </h3>
                      </div>
                      <div className="p-5">
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: shastar?.title,
                                text: `Check out this shastar: ${shastar?.title}`,
                                url: window.location.href
                              });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link copied to clipboard!');
                            }
                          }}
                        >
                          <IconShare2 className="mr-2 size-4" />
                          Share this Shastar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="discussion">
              <DiscussionSection type="ShastarInfo" discussionPlaceId={sId} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
}
