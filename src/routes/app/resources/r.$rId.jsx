import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconDownload, IconShare2 } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import millify from "millify";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import DiscussionSection from "@/components/DiscussionSection";
import { getSingleResourceMaterialSrv } from "@/services/resourceMaterial.service";
import { getUserSrv } from "@/services/user.service";

export const Route = createFileRoute("/app/resources/r/$rId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { rId } = Route.useParams();
  const [creatorinfo, setcreatorinfo] = useState();
  const [resourceMaterial, setResourceMaterial] = useState({});
  const [currentImageFocusURL, setcurrentImageFocusURL] = useState("/assets/placeholder-image.png");

  const getResourceInfo = async () => {
    const response = await getSingleResourceMaterialSrv(rId);
    console.log("Resource Response:", response.data);

    setResourceMaterial(response.data);
    setcurrentImageFocusURL(response.data.mainImage);

    // Fetch creator info after setting resource
    if (response.data.createdBy) {
      const creator = await getUserSrv(response.data.createdBy);
      setcreatorinfo(creator.data);
      console.log("Creator:", creator.data);
    }
  };
  useEffect(() => {
    getResourceInfo();
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
              <BreadcrumbLink href="/app/resources">Resources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{resourceMaterial?.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="text-gray-400   body-font overflow-hidden">
          <div className="container px-4 pt-12 mx-auto">
            <div className="flex flex-wrap  ">
              <div className="p-6 md:w-1/2 flex flex-col items-center">
                <img className="rounded-lg  w-full h-96 object-center object-cover" src={currentImageFocusURL || resourceMaterial?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                <div className="flex gap-2 py-2 justify-center items-center container w-full ">
                  {/* TODO main image gets lost when any of the image is clicked */}
                  {/* {resourceMaterial?.images.map((i)=>(

                  <img className="rounded-lg  size-16 object-center object-cover" src={resourceMaterial?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                  ))} */}
                  <img onClick={() => setcurrentImageFocusURL(resourceMaterial?.mainImage)} className="rounded-lg size-16 object-center object-cover cursor-pointer" src={resourceMaterial?.mainImage || "/assets/placeholder-weapon.png"} alt="main" />
                  {Array.isArray(resourceMaterial.images) && resourceMaterial.images.length > 0 ? resourceMaterial.images.map((img, idx) => (
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
                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium  uppercase">{resourceMaterial?.category}</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{resourceMaterial?.title}</h2>
                {/* <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" ">Paramters</TableHead>
                      <TableHead className=" ">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Author</TableCell>
                      <TableCell>{resourceMaterial.createdBy}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Weight</TableCell>
                      <TableCell>{Number(resourceMaterial.weight).toFixed(0)}g</TableCell>
                    </TableRow>
                  </TableBody>
                </Table> */}
                {resourceMaterial?.origin && (
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-muted-foreground">Origin: </span>
                    <span className="text-white">{resourceMaterial.origin}</span>
                  </div>
                )}
                
                {resourceMaterial?.tags && resourceMaterial.tags.length > 0 && (
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-muted-foreground mb-2 block">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {resourceMaterial.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center flex-wrap pb-4   border-gray-800 border-opacity-75 mt-auto w-full">
                  <img src={creatorinfo?.avatar} className=" rounded-full size-8" alt="" />
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-2">
                      <span className="title-font font-medium text-white">{creatorinfo?.name}</span>
                      <span className="text-muted-foreground text-xs  mt-0.5">{creatorinfo?.username}</span>
                    </span>
                  </a>

                  {/* <span className="text-muted-foreground mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {millify(resourceMaterial?.views)}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                    {"20"}
                  </span> */}
                </div>
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
                <div className="   grid gap-12 md:grid-cols-12 md:gap-8">
                  <div className="order-last md:order-none md:col-span-4 lg:col-span-3">
                    <aside className="flex flex-col gap-2">
                      {/* <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
                <div className="border-border bg-muted/50 border-b px-5 py-4">
                  <h3 className="flex items-center text-sm font-semibold">
                    <IconBook className="text-muted-foreground mr-2.5 size-3.5" />
                    Whitepaper
                  </h3>
                </div>
                <div className="p-5">
                  <div className="text-foreground gap-4 text-lg font-semibold leading-snug">
                    <p>The Complete Guide to Launching Your Startup</p>
                  </div>
                </div>
              </div> */}

                      {resourceMaterial?.pdfUrl && (
                        <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
                          <div className="border-border bg-muted/50 border-b px-5 py-4">
                            <h3 className="flex items-center text-sm font-semibold">
                              <IconDownload className="text-muted-foreground mr-2.5 size-3.5" />
                              Download PDF
                            </h3>
                          </div>
                          <div className="p-5">
                            <div className="space-y-4">
                              <p className="text-muted-foreground text-sm">Download this resource for offline reading.</p>
                              <Button 
                                className="w-full justify-between" 
                                variant="default"
                                onClick={() => window.open(resourceMaterial.pdfUrl, '_blank')}
                              >
                                Download PDF
                                <IconDownload className="ml-2 size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
                        <div className="border-border bg-muted/50 border-b px-5 py-4">
                          <h3 className="flex items-center text-sm font-semibold">
                            <IconShare2 className="text-muted-foreground mr-2.5 size-3.5" />
                            Share Resource
                          </h3>
                        </div>
                        <div className="p-5">
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: resourceMaterial?.title,
                                  text: `Check out this resource: ${resourceMaterial?.title}`,
                                  url: window.location.href
                                });
                              } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                              }
                            }}
                          >
                            <IconShare2 className="mr-2 size-4" />
                            Share this Resource
                          </Button>
                        </div>
                      </div>
                    </aside>
                  </div>
                  <div className="md:col-span-7 md:col-start-5  lg:col-start-6">
                    <Markdown>{resourceMaterial.description}</Markdown>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="discussion">
              <DiscussionSection type="ResourceMaterial" discussionPlaceId={rId} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
}
