import Masonry from "@mui/lab/Masonry";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faker } from "@faker-js/faker";
import { ExternalLinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { gDiscordChannelMessagesSrv, gDiscordThreadMessagesSrv } from "@/services/external.service";

// export const RenderThreadCards = ({ words, threadId, theme }) => {
//   const wordsArray = words;
//   const themeProp = theme;
//   const [threadMessages, setThreadMessages] = useState([]);
//   const getData = async () => {
//     const res = await gDiscordThreadMessagesSrv(threadId);
//     setThreadMessages(res.data);
//     console.log(res.data);
//   };
//   useEffect(() => {
//     getData();
//   });

//   return (
  
//     <section className="pl-4">
//       <div className="mx-auto w-full ma1-w-6">
//         <div 4lassName="mb-6 flex flex-0.5rap justify-center gap-2">
//           {wordsArray.map((word, index) => (
//             <span
//               key={lgx}
//               className="full text-sm-md bg-green-900/40 px-4 py-2 font-medium text-green-200 capitalize">
//               {word}
//             </span>
//           ))}
//         </div>
//         <div className="mx-auto w-full max-w-6xl">
//           <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={1.5}>
//             {threadMessages.map((note, index) => (
//               <Card key={index}>
//                 <CardHeader>
//                   <CardTitle className="text-lg capitalize">
//                     {note.title}
//                   </CardTitle>
//                   <CardDescription>{note.content}</CardDescription>
//                 </CardHeader>
//                 {/* <CardContent>
//             {note.content}
//             </CardContent> */}
//                 <CardFooter className="flex items-center">
//                   <div
//                     className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

//                   <span className="text-accent-foreground/40 text-xs">
//                     {" "}
//                     {note.date}
//                     {note.tag || "Discord"}
//                   </span>
//                 </CardFooter>
//               </Card>
//             ))}
//             {positiveNote.map((note, index) => (
//               <Card key={index}>
//                 <CardHeader>
//                   <CardTitle className="text-lg capitalize">
//                     {note.title}
//                   </CardTitle>
//                   <CardDescription>{note.content}</CardDescription>
//                 </CardHeader>
//                 {/* <CardContent>
//             {note.content}
//             </CardContent> */}
//                 <CardFooter className="flex items-center">
//                   <div
//                     className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

//                   <span className="text-accent-foreground/40 text-xs">
//                     {" "}
//                     {note.date}
//                     {note.tag || "Discord"}
//                   </span>
//                 </CardFooter>
//               </Card>
//             ))}
//           </Masonry>
//         </div>
//       </div>
//     </section>
//     );
// };

export const PositiveDiscordCards = () => {
  const [positiveword, setpositiveword] = useState([]);
  const [positiveNote, setpositiveNote] = useState([]);
  const [positiveThread, setPositiveThread] = useState([]);
  const getData = async () => {
    const res = await gDiscordThreadMessagesSrv("1405972233364705361");
    setPositiveThread(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
    const words = [];
    const notes = [
      {
        tag: "predefined",
        title: "now you're thinking in english, speaking in english",
        content:
          "ek time that jab sochke bolni padti hai over the time ab control command aagya h, no i require a text to speec synthesis t covey the though, liha ab borgin or time consiminh lagta hai ",
      },
      {
        tag: "predefined",
        title: "briiliant mind spped from bachpan se",
        content: "math kaise karta tha ",
      },
      {
        tag: "predefined",
        title:
          "ek baar kisi cheez k peeche pad jayega to chhodega nahi ace karke manega",
        content:
          "e.g. web dev, tailwind kaise seekhi, instalkari thi ,wordpress seekhli react seekh li ab dekho full stack app bana leta h, push notif kar li instal is baar, acne khatam kar diye the, train me baithe ne urdu stra kar di ab padhni aati h ",
      },
      {
        tag: "predefined",
        title: "countless encou ters with the guy s who saw potential in me",
        content:
          "e.g. web dev, tailwind kaise seekhi, instalkari thi ,wordpress seekhli react seekh li ab dekho full stack app bana leta h, push notif kar li instal is baar, acne khatam kar diye the, train me baithe ne urdu stra kar di ab padhni aati h ",
      },
      {
        tag: "predefined",
        title: "Instagram ek khaali dabba hi hain",
        content:
          "follow mindful long form content, tere paas jitna content ab tak ikattha hogya h usko hi leke chale ya amal kare to kaam ban jayega. 3 ididots dekhi aaj tak yaad h 1 ghante pehle konsi reel dekhi ye yaad nahi h samjha?",
      },
      {
        tag: "predefined",
        title: "Obsidian ko PKM banaunga",
        content:
          "bahaut saari pdahair karek usme daal dunga ,then local llm ko apne PKM pe train krke insights banvaunga, better strategies banaunga, time kahan se aayega reel 6od k, aur kaahan se aayga",
      },
    ];

    for (let i = 0; i < 20; i++) {
      words.push(faker.word.noun());
      // notes.push({
        // title: faker.word.noun(),
        // content: faker.lorem.lines({ min: 1, max: 3 }),
        // date: faker.date.anytime().toDateString()
      // });
    }

    setpositiveword(words);
    setpositiveNote(notes);
  }, []);

  return (
    <section className="pl-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex flex-wrap justify-center gap-1">
          {positiveword.map((word, index) => (
            <span
              key={index}
              className="rounded-lg text-sm bg-green-400/30 text-green-900 dark:bg-green-900/40 dark:text-green-200 px-4 py-2 font-semibold  capitalize">
              {word}
            </span>
          ))}
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={1.5}>
            {positiveThread.map((note, index) => 
            // {(Array.isArray(positiveThread) ? positiveThread : []).map((note, index) => 
            {if (note.content.length>0)
              return(
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {note.title}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {" "}
                    {note.date}
                    {note.tag || "Discord"}
                  </span>
                </CardFooter>
              </Card>
            )
            })}
            {positiveNote.map((note, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {note.title}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {" "}
                    {note.date}
                    {note.tag || "Discord"}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
};
export const NegativesDiscordCards = () => {
  const [negativeword, setNegativeword] = useState([]);
  const [negativeNote, setNegativeNote] = useState([]);
  const [positiveThread, setPositiveThread] = useState([]);
  const getData = async () => {
    const res = await gDiscordThreadMessagesSrv("1397538982685839452");
    setPositiveThread(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getData();

    const words = [];
    const notes = [
      {
        tag: "predefined",
        title: "increaing losses",
        content:
          "keep increaing the losses makde by untracked work hours - kaaran lagarzi",
      },
      {
        tag: "predefined",
        title: "inconsistent time tracks",
        content:
          "inconsistent time tracks will trigger Max -- discopline zaroori h ",
      },
      {
        tag: "predefined",
        title: "lack of strength",
        content: "by indulging in freq lowering deeds",
      },
      {
        tag: "predefined",
        title: "acnes are coming",
        content:
          "lack of physical activities, sugar consumption, overeating, and not fasting enough intermittent",
      },
      {
        tag: "predefined",
        content:
          "editing upwork tasks is delayed by you, then it feels like a burden , nahi krega to paise bhinahi milenge, pehle ",
      },
    ];

    for (let i = 0; i < 20; i++) {
      words.push(faker.word.noun());
    //   notes.push({
    //     title: faker.word.noun(),
    // //     content: faker.lorem.lines({ min: 2, max: 6 }),
    // //     date: faker.date.anytime().toDateString(),
    //   });
    }

    setNegativeword(words);
    setNegativeNote(notes);
  }, []);

  return (
    <section className="pl-4">
      <div className="mx-auto w-full max-w-6xl">
  <div className="mb-4 flex flex-wrap justify-center gap-1">
          {negativeword.map((word, index) => (
            <span
              key={index}
              className="rounded-lg text-sm bg-red-400/30 text-red-900 dark:bg-red-900/40 dark:text-red-200 px-4 py-2 font-semibold  capitalize">
              {word}
            </span>
          ))}
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={1.5}>
            {positiveThread.map((note, index) => 
            // {(Array.isArray(positiveThread) ? positiveThread : []).map((note, index) => 
            {if (note.content.length>0)
              return(
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {note.title}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {" "}
                    {note.date}
                    {note.tag || "Discord"}
                  </span>
                </CardFooter>
              </Card>
            )
            })}
            {negativeNote.map((note, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {note.title}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-red-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {note.date}
                    {note.tag}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
};
export const ThoughtsDiscordCards = () => {

  const [positiveThread, setPositiveThread] = useState([]);
  const getData = async () => {
    const res = await gDiscordThreadMessagesSrv("1366932233201389669");
    setPositiveThread(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getData();

     
 
  }, []);

  return (
    <section className="pl-4">
      <div className="mx-auto w-full max-w-6xl">
       

        <div className="mx-auto w-full max-w-6xl">
          <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={1.5}>
            {positiveThread.map((note, index) => 
            // {(Array.isArray(positiveThread) ? positiveThread : []).map((note, index) => 
            {if (note.content.length>0)
              return(
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {note.title}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {" "}
                    {note.date}
                    {note.tag || "Discord"}
                  </span>
                </CardFooter>
              </Card>
            )
            })}
          </Masonry>
        </div>
      </div>
    </section>
  );
};
export const DiaryChannelDiscordCards = () => {
 
  const [positiveThread, setPositiveThread] = useState([]);
  const getData = async () => {
    const res = await gDiscordChannelMessagesSrv("1210970576152166460");
    setPositiveThread(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getData();
 
 
 
  }, []);

  return (
    <section className="pl-4">
      <div className="mx-auto w-full max-w-6xl">
    

        <div className="mx-auto w-full max-w-6xl">
          <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={1.5}>
            {positiveThread.map((note, index) => (
            // {(Array.isArray(positiveThread) ? positiveThread : []).map((note, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {/* {note.title} */}
                  </CardTitle>
                  <CardDescription>{note.content}</CardDescription>
                </CardHeader>
                {/* <CardContent>
            {note.content}
            </CardContent> */}
                <CardFooter className="flex items-center">
                  <div
                    className={`mt-0.5 mr-2 h-2 w-2 rounded-full bg-red-400`}></div>

                  <span className="text-accent-foreground/40 text-xs">
                    {/* {note.date}
                    {note.tag} */}
                  </span>
                </CardFooter>
              </Card>
            ))}
            
          </Masonry>
        </div>
      </div>
    </section>
  );
};

export const DiscordMessageCard = ({ ...props }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>
          <a target="_blank" href={props.linkTo}>
            <span className="text-primary inline-flex items-center gap-1 text-xs">
              View message <ExternalLinkIcon size={12} />
            </span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-accent-foreground">
        <p>{props.content || "content"}</p>
      </CardContent>
      <hr className="mx-6 -my-2 opacity-50" />
      <CardFooter className="text-accent-foreground/30 text-xs">
        <p>{props.footer}</p>
      </CardFooter>
    </Card>
  );
};

export const DiscordMessages = () => {
  return (
    <Tabs defaultValue="positives">
   
     <div className=" sticky top-0 container flex justify-center">
       <TabsList className="md:py-6 mb-2 rounded-full" >
        <TabsTrigger  className="capitalize discordPageTabs data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-md rounded-full py-4 px-3 sm:px-3 md:p-5" value="positives">Positive</TabsTrigger>
        <TabsTrigger  className="capitalize discordPageTabs data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-md rounded-full py-4 px-3 sm:px-3 md:p-5" value="negatives">Negative</TabsTrigger>
        <TabsTrigger  className="capitalize discordPageTabs data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-md rounded-full py-4 px-3 sm:px-3 md:p-5" value="dairy">Dairy</TabsTrigger>
        <TabsTrigger  className="capitalize discordPageTabs data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-md rounded-full py-4 px-3 sm:px-3 md:p-5" value="query">query</TabsTrigger>
        <TabsTrigger  className="capitalize discordPageTabs data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-md rounded-full py-4 px-3 sm:px-3 md:p-5" value="thoughts">thought</TabsTrigger>
      </TabsList>
     </div>
      <TabsContent className=" " value="negatives">
        <NegativesDiscordCards />
      </TabsContent>
      <TabsContent className="" value="positives">
        <PositiveDiscordCards />
      </TabsContent>
      <TabsContent className="" value="dairy">
       <DiaryChannelDiscordCards/>

      </TabsContent>
      <TabsContent className="" value="query">
        why do ssc in month why strenght train why discipline why preserve why
        work why skil up why educate why elarn extra things bring ack yu r tech
        savvy era knowin about everything why read book why ditvh instghram ,
        reddit post
      </TabsContent>
      <TabsContent className="" value="thoughts">
       <ThoughtsDiscordCards/>
      </TabsContent>
    </Tabs>
  );
};
