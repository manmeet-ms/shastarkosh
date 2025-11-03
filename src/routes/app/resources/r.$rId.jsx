import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconDownload, IconShare2 } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import DiscussionSection from "@/components/DiscussionSection";
import { getSingleResourceMaterialSrv } from "@/services/resourceMaterial.service";
import { getUserSrv } from "@/services/user.service";
import { Book, Download, Share2 } from "lucide-react";


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
    setcurrentImageFocusURL(response.data.data.mainImage);

    // Fetch creator info after setting resource
    if (response.data.data.createdBy) {
      const creator = await getUserSrv(response.data.data.createdBy);
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
              <BreadcrumbPage className="capitalize">{resourceMaterial?.data?.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="text-gray-400   body-font overflow-hidden">
          <div className="container px-4 pt-12 mx-auto">
            <div className="flex flex-wrap  ">
              <div className="p-6 md:w-1/2 flex flex-col items-center">
                <img className="rounded-lg  w-full h-96 object-center object-cover" src={currentImageFocusURL || resourceMaterial?.data?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                <div className="flex gap-2 py-2 justify-center items-center container w-full ">
                  {/* TODO main image gets lost when any of the image is clicked */}
                  {/* {resourceMaterial?.data?.images.map((i)=>(

                  <img className="rounded-lg  size-16 object-center object-cover" src={resourceMaterial?.data?.mainImage || "/assets/placeholder-weapon.png"} alt="" />
                  ))} */}
                  <img onClick={() => setcurrentImageFocusURL(resourceMaterial?.data?.mainImage)} className="rounded-lg size-16 object-center object-cover cursor-pointer" src={resourceMaterial?.data?.mainImage || "/assets/placeholder-weapon.png"} alt="main" />
                  {Array.isArray(resourceMaterial?.data?.images) && resourceMaterial?.data?.images.length > 0 ? resourceMaterial?.data?.images.map((img, idx) => (
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
                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium  uppercase">{resourceMaterial?.data?.category}</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{resourceMaterial?.data?.title}</h2>
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
                {resourceMaterial?.data.origin && (
                  // <div className="mb-4">
                  //   <span className="text-sm font-semibold text-muted-foreground">Origin: </span>
                  //   <span className="text-white">{resourceMaterial.origin}</span>
                  // </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead  >Origin</TableHead>
                        <TableHead>Data</TableHead>
                         
                      </TableRow>
                    </TableHeader>
                    <TableBody>
         
                      <TableRow>
                        <TableCell className="font-semibold"  >Region</TableCell>
                        <TableCell>{resourceMaterial?.data?.origin?.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold"  >Culture</TableCell>
                        <TableCell>{resourceMaterial?.data?.origin?.culture}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold"  >Time Period</TableCell>
                        <TableCell>{resourceMaterial?.data?.origin?.timePeriod}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold"  >Year Estimated</TableCell>
                        <TableCell>{resourceMaterial?.data?.origin?.yearEstimated}</TableCell>
                      </TableRow>
                   
                    </TableBody>
                  </Table>
                )}
                
                {resourceMaterial?.data?.tags && resourceMaterial?.data?.tags.length > 0 && (
                  <div className="my-4">
                    <div className="flex flex-wrap gap-2">
                      {resourceMaterial?.data?.tags.map((tag, idx) => (
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
                    {millify(resourceMaterial?.data?.views)}
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
              <section className="py-32">
      <div className="container grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="order-last md:order-none md:col-span-4 lg:col-span-3">
          <aside className="flex flex-col gap-2">
            <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
              <div className="border-border bg-muted/50 border-b px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Book className="text-muted-foreground mr-2.5 size-3.5" />
                  Resource Material
                </h3>
              </div>
              <div className="p-5">
                <div className="text-foreground gap-4 text-lg font-semibold leading-snug">
                  <p>{resourceMaterial?.data?.title}</p>
                </div>
              </div>
            </div>

            <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
              <div className="border-border bg-muted/50 border-b px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Download className="text-muted-foreground mr-2.5 size-3.5" />
                  Download Options
                </h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Download this resource for offline reading or sharing.
                  </p>
                  <div className="flex flex-col space-y-2">
                    {resourceMaterial?.data?.pdfUrl && (
                      <Button
                        className="w-full justify-between"
                        variant="default"
                        onClick={() => window.open(resourceMaterial?.data?.pdfUrl, '_blank')}
                      >
                        PDF Format
                        <Download className="ml-2 size-4" />
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                    <p>Views: {resourceMaterial?.data?.views || 0}</p>
                    <p>Likes: {resourceMaterial?.data?.likes || 0}</p>
                    <p>Comments: {resourceMaterial?.data?.commentCount || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
              <div className="border-border bg-muted/50 border-b px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Share2 className="text-muted-foreground mr-2.5 size-3.5" />
                  Share this guide
                </h3>
              </div>
              <div className="p-5">
                <ul className="flex items-center gap-2">
                  <li>
                    <a
                      href="#"
                      className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors"
                      aria-label="Share on Instagram"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg"
                        alt="Instagram"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors"
                      aria-label="Share on Product Hunt"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/producthunt-icon.svg"
                        alt="Product Hunt"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/twitter-icon.svg"
                        alt="Twitter"
                        className="size-5"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          <article className="prose dark:prose-invert prose-sm">
            <Markdown>{resourceMaterial?.data?.description}</Markdown>
          </article>
          
          {resourceMaterial?.data?.sources && resourceMaterial?.data?.sources.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Sources & References</h3>
              <div className="space-y-4">
                {resourceMaterial?.data?.sources.map((source, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">{source.title}</p>
                    <p className="text-sm text-muted-foreground">By {source.author}</p>
                    {source.publication && (
                      <p className="text-sm text-muted-foreground">{source.publication} ({source.year})</p>
                    )}
                    {source.link && (
                      <a href={source.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        View Source
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
