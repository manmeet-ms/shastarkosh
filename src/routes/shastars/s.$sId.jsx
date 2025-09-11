import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import millify from "millify";
import { useEffect, useState } from "react";

import DiscussionSection from "../../components/DiscussionSection";
import { getSingleShastarSrv } from "../../services/shastarInfo.service";
import { getUserSrv } from "../../services/user.service";

export const Route = createFileRoute("/shastars/s/$sId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sId } = Route.useParams();

  const [shastar, setShastar] = useState({});
  const [currentImageFocusURL, setcurrentImageFocusURL] = useState("/assets/placeholder-image.png");

  const getShastarInfo = async () => {
    const resInfo = await getSingleShastarSrv(sId);
    console.log(resInfo.data);
    console.log(resInfo.data.images[0]);

    setShastar(resInfo.data);
    setcurrentImageFocusURL(resInfo.data.mainImage);
    console.log("resShastars", shastar);
  };

  const [creatorInfo, setcreatorInfo] = useState()
  async function getCreatorInfo(creatorId) {
    const creator = await getUserSrv(creatorId);
    console.log(creatorId, creator);
    setcreatorInfo(creator)
    return creator;
  }
  useEffect(() => {
    getShastarInfo();
getCreatorInfo(shastar.createdBy)
    console.log("creator", creatorInfo);
    console.log("resShastars useEffect", shastar);
    console.log("resShastars useEffect", shastar.images);
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
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shastars">Shastars</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{shastar?.name} </BreadcrumbPage>
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
                  {Array.isArray(shastar.images) && shastar.images.length > 0 ? shastar.images.map((img, idx) => <img onClick={() => setcurrentImageFocusURL(img)} key={idx} className="rounded-lg size-16 object-center object-cover" src={img || "/assets/placeholder-weapon.png"} alt={`thumb-${idx}`} />) : <img className="rounded-lg size-16 object-center object-cover" src="/assets/placeholder-weapon.png" alt="placeholder" />}{" "}
                </div>
              </div>
              <div className="p-6 md:w-1/2 flex flex-col items-start">
                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium  uppercase">{shastar.category}</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{shastar?.name}</h2>
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
                <p className="leading-relaxed mb-8">Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's, slow-carb etsy tumeric.</p>
                <div className="flex items-center flex-wrap pb-4   border-gray-800 border-opacity-75 mt-auto w-full">
                  <a className="inline-flex items-center">
                    <img alt="blog" src="https://dummyimage.com/103x103" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-white">{creatorInfo?.name}</span>
                      <span className="text-muted-foreground text-xs  mt-0.5">Author</span>
                    </span>
                  </a>

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
                </div>
              </div>
            </div>
          </div>
          <Tabs className="mx-4" defaultValue="discussion">
            <TabsList>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="information">{shastar?.description}</TabsContent>
            <TabsContent value="discussion">
              <DiscussionSection type="ShastarInfo" discussionPlaceId={sId} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
}
