import React from 'react'
import { useParams } from 'react-router-dom'

const ForumPostDetails = () => {
  const params=useParams()
  return (
    <div>{params.pId}</div>
  )
}

export default ForumPostDetails

// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import dayjs from "dayjs";
// import millify from "millify";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { getSingleForumPostSrv } from "../services/forumPost.service";

// const ForumPostDetails = () => {
//   const params = useParams();

//   const [shastar, setShastar] = useState({});
//   const [shastarDiscussion, setShastarDiscussion] = useState([]);
//   const getShastarInfo = async () => {
//     const resInfo = await getSingleForumPostSrv(params.pId);
//     console.log(resInfo.data);

//     setShastar(resInfo.data);
//     setShastarDiscussion(resInfo.data?.comments);
//     console.log("resShastars", shastar);
//     console.log("resShastars", shastarDiscussion);
//   };
//   useEffect(() => {
//     getShastarInfo();
//     console.log("resShastars useEffect", shastar);
//   }, []);
//   console.log(params);
//   // TODO gets shatsra details make a empty objects and store it , cache it,
//   // fetch shartas info and cche it and displa
//   return (
//     <>
//       <main className="px-4 pb-24 flex flex-col items-start">
//         {" "}
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/shastars">Shastars</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage className="capitalize">{shastar?.name} </BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <section className="text-gray-400   body-font overflow-hidden">
//           <div className="container px-4 pt-12 mx-auto">
//             <div className="flex flex-wrap  ">
//               <div className="p-6 md:w-1/2 flex flex-col items-center">
//                 <img className="rounded-lg  w-full h-96 object-center object-cover" src={shastar?.mainImage} alt="" />
//                 <div className="flex gap-2 py-2 justify-center items-center container w-full ">
//                   <img className="rounded-lg  size-16 object-center object-cover" src={shastar?.mainImage} alt="" />
//                   <img className="rounded-lg  size-16 object-center object-cover" src={shastar?.mainImage} alt="" />
//                   <img className="rounded-lg  size-16 object-center object-cover" src={shastar?.mainImage} alt="" />
//                   <img className="rounded-lg  size-16 object-center object-cover" src={shastar?.mainImage} alt="" />
//                 </div>
//               </div>
//               <div className="p-6 md:w-1/2 flex flex-col items-start">
//                 <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium  uppercase">{shastar?.categories}</span>
//                 <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{shastar?.name}</h2>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className=" ">Paramters</TableHead>
//                       <TableHead className=" ">Value</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">Length</TableCell>
//                       <TableCell>{shastar.length}m</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Weight</TableCell>
//                       <TableCell>{Number(shastar.weight).toFixed(0)}g</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//                 <p className="leading-relaxed mb-8">Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's, slow-carb etsy tumeric.</p>
//                 <div className="flex items-center flex-wrap pb-4   border-gray-800 border-opacity-75 mt-auto w-full">
//                   <a className="inline-flex items-center">
//                     <img alt="blog" src="https://dummyimage.com/103x103" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
//                     <span className="flex-grow flex flex-col pl-4">
//                       <span className="title-font font-medium text-white">Alper Kamu</span>
//                       <span className="text-muted-foreground text-xs  mt-0.5">Author</span>
//                     </span>
//                   </a>

//                   <span className="text-muted-foreground mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
//                     <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                       <circle cx="12" cy="12" r="3"></circle>
//                     </svg>
//                     {millify(shastar?.views)}
//                   </span>
//                   <span className="text-muted-foreground inline-flex items-center leading-none text-sm">
//                     <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                       <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
//                     </svg>
//                     {"20"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Tabs className="mx-4" defaultValue="discussion">
//             <TabsList  >
//               <TabsTrigger value="information">Information</TabsTrigger>
//               <TabsTrigger value="discussion">Discussion ({shastarDiscussion.length})</TabsTrigger>
//             </TabsList>
//             <TabsContent value="information">{shastar?.description}</TabsContent>
//             <TabsContent value="discussion">
//               <section id="discussion" className=" py-4 lg:py-16 antialiased">
//                 <div className="  mx-auto  ">
//                   <form className="mb-4">
//                     <div className=" flex items-center justify-center gap-4 ">
//                       <label htmlFor="comment" className="sr-only">
//                         Your comment
//                       </label>

//                       <Textarea id="comment" rows="6" placeholder="Write a comment..." required />
//                       <Button type="submit">Post comment</Button>
//                     </div>
//                   </form>
//                   {shastarDiscussion.map((c, idx) => (
//                     <div key={c._id} className="p-4 text-base  rounded-lg ">
//                       <footer className="flex justify-between items-center mb-2">
//                         <div className="flex items-center">
//                           <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                             <img className="mr-2 w-6 h-6 rounded-full" src={c.avatar} />
//                             {c.username}
//                           </p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">{dayjs(c.createdAt).format("DD MMM, YYYY HH:mm A")}</p>
//                         </div>
//                         {/* <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" className="inline-flex items-center p-2 text-sm font-medium text-center text-muted-foreground dark:text-gray-400  rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
//                         <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
//                           <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                         </svg>
//                         <span className="sr-only">Comment settings</span>
//                       </button> */}
//                       </footer>
//                       <p className="text-muted-foreground dark:text-gray-400">{c.text}</p>
//                       {/* <div className="flex items-center mt-4 space-x-4">
//                       <button type="button" className="flex items-center text-sm text-muted-foreground hover:underline dark:text-gray-400 font-medium">
//                         <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
//                         </svg>
//                         Reply
//                       </button>
//                     </div> */}
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </TabsContent>
//           </Tabs>
//         </section>
//       </main>
//     </>
//   );
// };

// export default ForumPostDetails;

